var bg,bg_image
var player,player_image,playerShooting_img
var zombie,zombie_img,zombies_grp
var heart_1,heart_2,heart_3,heart_1img,heart_2img,heart_3img;
var bullet,bullet_img,bullet_count=70,gameState="fight",bullet_grp
var explosion_sound,lose_sound,winning_sound
var score=0
var life=3



function preload() {
bg_image = loadImage("assets/bg.jpeg")
player_image = loadImage("assets/shooter_1.png")
playerShooting_img = loadImage("assets/shooter_3.png")
zombie_img = loadImage("assets/zombie.png")
heart_1img = loadImage("assets/heart_1.png")
heart_2img = loadImage("assets/heart_2.png")
heart_3img = loadImage("assets/heart_3.png")
bullet_img = loadImage("assets/bullet.png")
explosion_sound = loadSound("assets/explosion.mp3")
lose_sound = loadSound("assets/lose.mp3")
winning_sound = loadSound("assets/win.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  //bg = createSprite(displayWidth/2-25,displayHeight/2-45)
  //bg.addImage("background",bg_image)

  player = createSprite(displayWidth/2-200,displayHeight/2+400)
  player.addImage(player_image)
  player.scale=0.9
  player.debug=true
  player.setCollider("rectangle",0,0,400,400)

  heart_1 = createSprite(displayWidth+2000,50)
  heart_1.addImage(heart_1img)
  heart_1.scale=0.25
  heart_1.visible=false

  heart_2 = createSprite(displayWidth+1950,50)
  heart_2.addImage(heart_2img)
  heart_2.scale=0.25
  heart_2.visible = false

  heart_3 = createSprite(displayWidth+2000,50)
  heart_3.addImage(heart_3img)
  heart_3.scale=0.25
  heart_3.visible = false


  zombies_grp = new Group()
  bullet_grp = new Group()
}

function draw(){
 background(bg_image)

  if(keyWentDown("space")) {
    player.addImage(playerShooting_img)
    bullet = createSprite(player.x,player.y-42)
    bullet.addImage(bullet_img)
    bullet.scale=0.3
    bullet.velocityX = 50
    player.depth = bullet.depth
    player.depth +=2
    bullet_grp.add(bullet)
    bullet_count -=1


  }else if(keyWentUp("space")) {
     player.addImage(player_image)
  }

  if(keyDown("UP_ARROW")||touches.length>0){
   player.y-=25

  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y+=25
 
   }

   if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x-=25
 
   }
   if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x+=25
 
   }
   if(zombies_grp.isTouching(player)){
     for (var i=0;i<zombies_grp.length;i++){
       if (zombies_grp[i].isTouching(player)){
         zombies_grp[i].destroy()
         life-=1
         
       }
     }
   }

   if (zombies_grp.isTouching(bullet_grp)){
     for(var i=0;i<zombies_grp.length;i++) {
       if (zombies_grp.isTouching(bullet_grp)){
         bullet_grp.destroyEach()
         zombies_grp[i].destroy()
         score+=2
         explosion_sound.play()
       }
     }
   }
  
   if (gameState == "bullet"){
     textSize(100)
     fill("yellow")
     text("BULLETS ARE OVER PLEASE RELOAD",displayWidth/2,displayHeight/2)
     player.destroy()
     zombies_grp.destroyEach()
     bullet_grp.destroyEach()
     lose_sound.play()

   }else if (gameState == "lost"){
    textSize(100)
    fill("red")
    text("GAME OVER",400,400)
    player.destroy()
    zombies_grp.destroyEach()
    
   }else if (gameState == "won"){
    textSize(100)
    fill("green")
    text("CONGRAGULATIONS YOU WON",400,400)
    player.destroy()
    zombies_grp.destroyEach()
   }

   if (gameState=="fight"){
     if(life==3){
       heart_3.visible=true
       heart_2.visible=false
       heart_1.visible=false
     }
     if(life==2){
       heart_2.visible=true
       heart_1.visible=false
       heart_3.visible=false
     }
     if(life==1){
       heart_1.visible=true
       heart_3.visible=false
       heart_2.visible=false
     }
     if(life==0){
       gameState="lost"
       lose_sound.play()
     }
     if(score ==100){
       gameState="won"
       winning_sound.play()
     }
   }

   if (bullet_count==0){
     gameState="bullet"

   }
   if(score>=26&&score<=48){
    zombie.velocityX=-20
   }
   if(score>=50&&score<=74){
     zombie.velocityX=-25
   }
   if(score>=76&&score<=100){
    zombie.velocityX=-30
  }

   textSize(60)
   fill("orange")
   text("BULLETS="+bullet_count,displayWidth-1210,displayHeight/2-280)
   text("SCORE="+score,displayWidth-1210,displayHeight/2-190)
   text("LIFE="+life,displayWidth-1210,displayHeight/2-100)
   enemy()

  drawSprites()
}

function enemy(){
  if (frameCount%100===0){
  zombie = createSprite(random(width-10,width),random(displayHeight/2+350,displayHeight+700))
  zombie.addImage(zombie_img)
  zombie.scale=0.5
  zombie.velocityX=-11
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,800,800)
  zombie.lifetime=800
  zombies_grp.add(zombie)
  }
}
var trex,trexRun,trexcollide;
var ground,groundimg,invisibleGround;
var cloudimg,cloudGroup
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var obstacleGroup
var gameOver
var restart 
var gameOverimg
var restartimg
var sound1,sound2,sound3



var Play=1
var End= 0
var gameState=Play

function preload(){
trexRun=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollide=loadAnimation("trex_collided.png")
cloudimg=loadImage("cloud.png");
groundimg=loadImage("ground2.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
gameOverimg=loadImage("gameOver.png");
restartimg=loadImage("restart.png");
sound1=loadSound("checkPoint.mp3");
sound2=loadSound("jump.mp3");
sound3=loadSound("die.mp3");
}
function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,20,20);
  trex.addAnimation("Run",trexRun);
  trex.addAnimation("Collide",trexcollide)
  trex.scale=0.5;
  ground=createSprite(200,180,20,20);
  ground.addImage("groundmove",groundimg);
  ground.velocityX=-5
  invisibleGround=createSprite(200,190,400,5,);
  invisibleGround.visible=false;
  cloudGroup=new Group();
  ObstaclesGroup=new Group();
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;
  gameOver.visible=false
  restart.visible=false
}

function spawnCloud() {
  if(frameCount%60===0){
  var cloud=createSprite(600,random(80,110),20,20);
  cloud.scale=0.5
  cloud.addImage("cloudimg",cloudimg);
  cloud.velocityX=-3
  cloud.lifetime=200
  cloudGroup.add(cloud);
  cloud.depth=trex.depth
trex.depth=trex.depth+1
    
  }
  }

  function spawnObstacles(){
   if(frameCount%80===0){
    var obstacle=createSprite(600,170  ,20,20);
    var randomObstacles = Math.round(random (1,6))
    ObstaclesGroup.add(obstacle);
    obstacle.lifetime=200;
    obstacle.velocityX=-6;
    switch(randomObstacles){
      case 1 :
        obstacle.addImage(obstacle1);
        break;
        
      case 2 :
        obstacle.addImage(obstacle2);
        break;
        
      case 3 :
        obstacle.addImage(obstacle3);
        break;
        
       case 4 :
        obstacle.addImage(obstacle4);
        break;
         
    case 5 :
        obstacle.addImage(obstacle5);
        break;
        
    case 6:
        obstacle.addImage(obstacle6);
        break;
        default:break;
    }
  obstacle.scale=0.5;
   } 
  }

function reset(){
  gameState = Play;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("Run",trexRun);
  
  score   = 0;
}

function draw() {
  background(255);
  if(gameState===Play){
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(score>0 && score%100 === 0){
       sound1.play()
  }
    ground.velocityX=-6;
  if(keyDown("space")&& trex.y>150){
     trex.velocityY=-14   
     sound2.play();              
  } 
  trex.velocityY=trex.velocityY+0.8;
  spawnCloud(); 
  spawnObstacles();
  if(ObstaclesGroup.isTouching(trex)){
      gameState = End;
    sound3.play();
  }
  score=score+Math.round(getFrameRate()/60);
  }
  else if(gameState===End){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("Collide",trexcollide );
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
    trex.collide(invisibleGround);
    text("SCORE: "+ score,500,50);
  
  
    
   
    drawSprites();
  
  
}
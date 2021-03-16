var PLAY = 1; 
var END = 0;
var gameState = PLAY; 
var monkey , monkey_running; 
var banana ,bananaImage, obstacle, obstacleImage; 
var FoodGroup, obstacleGroup; 
//var ground, invisibleGround;  
var score; 
//var obstacle; 
//var survivalTime; 

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 200); 
  monkey = createSprite(50,180,20,50); 
  monkey.addAnimation("monkey_runs", monkey_running); 
  monkey.scale = 0.1; 
   
  ground = createSprite(210,190,1400,15);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(0, 190, 600, 10); 
  invisibleGround.visible = true; 

  foodGroup = createGroup(); 
  obstacleGroup = createGroup(); 
  
  score = 0; 

}


function draw() {
  background(200); 

  if(gameState === PLAY){ 
  ground.velocityX = -4; 
    if(ground.x<0){ 
    ground.x = ground.width/2; 
    }
    
  if(keyDown("space") && monkey.y >= 130){
    monkey.velocityY = -15; 
  }
    monkey.velocityY  = monkey.velocityY + 0.8; 
    
    stroke("black"); 
    textSize (15); 
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate()); 
    text("Survival Time:"+ survivalTime, 100, 50); 
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END; 
      monkey.velocityX = 0;
    }
    spawnFood(); 
    spawnObstacle(); 
  }
  else if (gameState === END){
    ground.velocityX = 0; 
    monkey.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.setLifetimeEach(-1); 
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }

  monkey.collide(invisibleGround); 
  drawSprites(); 
}

function spawnObstacle(){
 if (frameCount % 70 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.addImage(obstacleImage); 
   obstacle.scale = 0.1; 
   obstacle.velocityX = -(6+frameCount % 80/500); 
   
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   }
 }

function spawnFood(){
  if(frameCount % 60 === 0){
    banana = createSprite(600, 200, 20, 20); 
    banana.addImage(bananaImage); 
    banana.y = Math.round(random(110, 170)); 
    banana.velocityX = -4; 
    banana.scale = 0.1; 
    banana.lifetime = 150; 
    foodGroup.add(banana); 
  }
}
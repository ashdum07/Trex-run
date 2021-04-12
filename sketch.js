var trex, trex_running, edges;
var groundImage;
var ground;
var cloutImg;
var backgroundImg;
var ob1,ob2,ob3,ob4,ob5,ob6;
var invisibleground;
var score;
var obstaclesGroup
var cloudsGroup
var PLAY=1;
var END=0;
var carrie, cloudie;
var gameover,restart,gameoverIMg,restartIMg;
var trex_collide;
var gameState=PLAY;
var jumpsound,diesound,checkpointsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide = loadAnimation("trex_collided.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png")
  groundImage = loadImage("ground2.png")
  ob1= loadImage("obstacle1.png")
  ob2= loadImage("obstacle2.png")
  ob3= loadImage("obstacle3.png")
  ob4= loadImage("obstacle4.png")
  ob5= loadImage("obstacle5.png")
  ob6= loadImage("obstacle6.png")
  cloutImg=loadImage("clout.png")
  backgroundImg=loadImage("background.jpeg")
  jumpsound=loadSound("jump.mp3")
  diesound=loadSound("die.mp3")
  checkpointsound=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200);
  // creating trex
  trex = createSprite(50,130,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("touching", trex_collide);
  trex.debug=false
  trex.setCollider("circle",0,0,50)
  edges = createEdgeSprites();
  //creating the ground
  ground= createSprite(50,190,600,15)
  ground.addImage("This Is For Ground",groundImage)
  ground.velocityX=-4;
  ground.x=ground.width/2
  invisibleground= createSprite(50,195,600,5)
  invisibleground.visible=false;
  
  gameover = createSprite(300,100,20,50);
  gameover.addImage(gameoverImg)
  gameover.tint="white"
  restart = createSprite(300,130,20,50);
  restart.addImage(restartImg)
  restart.scale=0.5;
  restart.visible= false;
  gameover.visible= false;
  score=0
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}


function draw(){
  //set background color 
  background(backgroundImg);
  fill("lime")
  textSize(15)
  
  //setting dino color
  trex.velocityY = trex.velocityY + 0.5;
  //setting the text color and size
  fill("violet")
  textSize(20)
  if(score>0 && score%500===0){
    checkpointsound.play()
  }
  
  //logging the y position of the trex
  console.log(trex.y)
  if(gameState===PLAY){
    stroke("white")
    text("DINO GAME RAWR",200,100)
    //jump when space key is pressed
  if(keyDown("space")&&trex.y>150){
    trex.velocityY = -10;
    jumpsound.play()

  }
  ground.velocityX=-(4+score/1000)
  //when ground move out of screen and resets
  if(ground.x<0){
    ground.x=ground.width/2 ;
  }
  
  
  score+= Math.round(getFrameRate()/60)
  clouds()
  obstacles()
  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
    diesound.play()
    //trex.velocityY=-12 
    //jumpsound.play()
  }
  }
   if(gameState===END){
     gameover.visible= true
     restart.visible= true
    ground.velocityX=0;
    trex.changeAnimation("touching", trex_collide)
     if(mousePressedOver(restart)){
    reset()
  }
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
  }
  stroke("white")
  text("HighScore:"+score,450,15)
  
  
  //stop trex from falling down
  trex.collide(invisibleground)
  drawSprites();
}
  
function clouds(){
  if(frameCount%60===0){
    cloudie=createSprite(600,100,20,20)
    cloudie.addImage(cloutImg)
    cloudie.velocityX= -4
    cloudie.y=Math.round(random(5,50))
    cloudie.scale= 0.3
    cloudie.depth=trex.depth
    cloudie.lifetime=200
    trex.depth=trex.depth+1
    cloudsGroup.add(cloudie);
}
}

function obstacles(){
  if(frameCount%80===0){
    carrie=createSprite(600,170,20,20)
    carrie.velocityX= -(4+score/200)
    carrie.scale= 0.5
    carrie.lifetime=200
    var a=Math.round(random(1,6))
    switch(a){
      case 1:carrie.addImage(ob1)
        break
        case 2:carrie.addImage(ob2)
        break
        case 3:carrie.addImage(ob3)
        break
        case 4:carrie.addImage(ob4)
        break
        case 5:carrie.addImage(ob5)
        break
        case 6:carrie.addImage(ob6)
        break
        default:break
        
    }
        carrie.depth=trex.depth;
        trex.depth+=1;
   obstaclesGroup.add(carrie);
}
}
  function reset(){
    gameState=PLAY
    gameover.visible=false;
    restart.visible=false;
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach();
    score=0;
    trex.changeAnimation("running",trex_running);
  }
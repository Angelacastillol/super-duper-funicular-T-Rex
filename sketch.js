var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nube, cloud;
var obstacleImg, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, obstacle6Img
var score=0;
var obstacleGroup;
var gameState = "serve";
var vidas=3;
var play = 1;
var end = 0;
var restartImg, restart;
var gameOverImg, gameOver;
var NubesGroup;
// bugs: T-rex volador, puntuacion, vidas, imagen collided.

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    nube = loadImage("cloud.png");
    obstacle1Img = loadImage ("obstacle1.png");
    obstacle2Img = loadImage ("obstacle2.png");
    obstacle3Img = loadImage ("obstacle3.png");
    obstacle4Img = loadImage ("obstacle4.png");
    obstacle5Img = loadImage ("obstacle5.png");
    obstacle6Img = loadImage ("obstacle6.png");
    restartImg =loadImage ("restart.png");
    gameOverImg = loadImage ("gameOver.png");
}

function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    invisibleGround = createSprite(300,190,600,10);
    invisibleGround.visible=false;
    obstacleGroup = createGroup();
    restart = createSprite(300,145);
    gameOver = createSprite (300,70);
    restart.addImage(restartImg);
    gameOver.addImage(gameOverImg);
    NubesGroup = createGroup();
}

function draw() {

    background(150);
    fill("white");
    textSize(15);
    text("X "+mouseX+","+"Y "+mouseY,mouseX,mouseY);
    text("vidas: "+vidas,25,20);

    trex.setCollider("circle",0,0,40);
    trex.debug=false;

    text("puntuacion: "+score,465,25 )
    score = score + Math.round(frameCount/60);
    if(gameState == "serve"){
        trex.x = 50;
        trex.y = 160;
        restart.visible = false;
        gameOver.visible = false;
        text("presiona la tecla espacio para empezar",200,115);
        score = 0;
        if(keyDown("space")){
            gameState = "play";
        }

    } else if(gameState == "play"){
        trex.velocityX = 0;
        
        gameOver.visible = false;
        restart.visible = false;

        ground.velocityX = -(4 + 3* score/100);
        score = score+Math.round(getFrameRate()/60);
        if(score<0 && score%100===0){
        //cargar sonido
        }
        if(ground.x < 0){
            ground.x=ground.width/2;
         }
        
       

        //jump when the space button is pressed
        if (keyDown("space") && trex.y>=128) {

        trex.velocityY = -10;
        }
        trex.velocityY = trex.velocityY + 0.8;

        nubes();
        aparecer_obstaculos();

        if(obstacleGroup.isTouching(trex)){
            noLifes();
            gameState= "over";
        }

        }else if(gameState == "over"){
        //text ("Game Over",200,115);
        trex.changeAnimation("collide",trex_collided);
        gameOver.visible = true;
        restart.visible = true;
        
        ground.velocityX = 0;
        
        obstacleGroup.setVelocityXEach(0);
        NubesGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        NubesGroup.setLifetimeEach(-1);
        /*trex.remove();
        ground.remove();
        obstacleGroup.remove();*/
        
        if(mousePressedOver(restart)){
            reset();
        }

    }

    //console.log(trex.y);
    trex.collide(invisibleGround);
    drawSprites();

}

function nubes(){
    if(frameCount%85==0){
      cloud= createSprite(650,100,40,10);
      cloud.addImage(nube);
      cloud.scale=1;
      cloud.velocityX=-4;
      cloud.y=Math.round(random(10,80));
      console.log(cloud);
      cloud.depth = trex.depth;
      trex.depth = trex.depth+1;
      //tiempo de vida
      cloud.lifetime = 250;
      NubesGroup.add(cloud);
    }
}

function noLifes(){
    vidas-=1;
    if(vidas>1){
        gameState = "play";
    }else{
        gameState = "over";
    }
}

function keyDownEspacio(){
    if (gameState=="play"){
      ball.velocityX = 4;
      ball.velocityY = 4;
    }
  }

function aparecer_obstaculos(){
 if(frameCount%65 == 0){
    var obstacle1 = createSprite(550,165,10,30);
    obstacle1.velocityX=-4;

    var rando = Math.round(random(1,6));
    switch(rando){
     case 1: obstacle1.addImage(obstacle1Img);
             break;
    case 2: obstacle1.addImage(obstacle2Img);
             break;
    case 3: obstacle1.addImage(obstacle3Img);
             break;
    case 4: obstacle1.addImage(obstacle4Img);
             break;
    case 5: obstacle1.addImage(obstacle5Img);
             break;
    case 6: obstacle1.addImage(obstacle6Img);
             break;
    default:break;
    }
    obstacle1.lifetime = 250;
    obstacle1.scale = 0.7;
    obstacle1.depth = trex.depth;
    trex.depth = trex.depth+1;
    obstacleGroup.add(obstacle1);
 }
 
}

function reset(){
    gameState = "serve";
    obstacleGroup.destroyEach();
    NubesGroup.destroyEach();
    score = 0;
}   
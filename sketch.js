
//making variables
var trex ,trex_running, ground, ground_image, invisibleGround, cloud, cloud_image;
var trex_collided;
var score = 0;
var obstacle_group, cloud_group;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var game_over;
var gameover;
var restart;
var re_start;
var checkpoint_sound, jump_sound, die_sound;

//loading images and animations
function preload()
{
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");  
  trex_collided = loadAnimation ("trex_collided-1.png");
  ground_image = loadImage ("ground2.png");
  cloud_image = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  gameover = loadImage ("gameOver.png");
  restart = loadImage ("restart trex.png");
  jump_sound = loadSound ("jump.mp3");
  checkpoint_sound = loadSound ("checkpoint.mp3");
  die_sound = loadSound ("die.mp3");
}

function setup()
{
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite (50, height-5, 20, 50);
  trex.addAnimation ("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  //edges = createEdgeSprites ();
  ground = createSprite (width/2, height-10, width, 20);
  ground.addImage (ground_image);

  //invisible ground to make it more realistic
  invisibleGround = createSprite (width/2, height-5, width, 10);
  invisibleGround.visible = false;

  //creating groups
  obstacle_group = createGroup ();
  cloud_group = createGroup ();

  //creating restart and game over
  game_over = createSprite (width/2,height/2);
  game_over.addImage(gameover);
  re_start = createSprite (width/2,height/2+50);
  re_start.addImage(restart);
  
}

function draw()
{
  background("white");
  //creating score
  text ("Score: " + score, width-80, height-500);
  
//setting gamestate play
  if (gamestate===PLAY)
  {
    //when space bar is pressed, Trex will jump
     if ((keyDown("space")||touches.length>0)&&(trex.y>=height-50)) 
     {
       trex.velocityY = -10;
       jump_sound.play();
      }  

    //gravity effect
     trex.velocityY = trex.velocityY + 0.5;
     trex.collide (invisibleGround);
     ground.velocityX = -3;


    //making the ground reset
     if (ground.x<0)
      {
        ground.x = ground.width/2;
      }
  
    //adding score
      score = score + Math.round(getFrameRate()/50);

    //calling cactus and clouds functions
    create_clouds();
    create_cactus();

    //restart button
    re_start.visible = false;
    game_over.visible = false;

    //changing gamestate if trex touches cactus
    if (obstacle_group.isTouching (trex))
    {
      gamestate=END;
      die_sound.play();
      //trex.velocityY = -12;
      //jump_sound.play();
    }
  
    if (score>0 && score%500 === 0)
    {
       checkpoint_sound.play(); 
    }



  }
 
 //setting end gamestate
  else if (gamestate===END)
  {
      ground.velocityX = 0;
      cloud_group.setVelocityXEach(0);
      obstacle_group.setVelocityXEach(0);
      trex.changeAnimation("collided", trex_collided)
      cloud_group.setLifetimeEach(-1);
      obstacle_group.setLifetimeEach(-1);
      trex.velocityY = 0;
      re_start.visible = true;
      game_over.visible = true;
      if (mousePressedOver(re_start))
        {
          reset ();
        }
  }
//setting collider
//trex.setCollider("rectangle", 0, 0, 400, trex.height);
trex.setCollider("circle", 0, 0, 40)
//trex.debug = true;  


  //console.log (frameCount);
if (touches.length>0)
{
  touches=[]
}


  drawSprites ();
}

//creating clouds
function create_clouds ()
{
  if (frameCount%100 == 0)
  {
    cloud = createSprite (width-20,height-100,40,40);
    cloud.velocityX = -3;
    cloud.addImage (cloud_image);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(70,100));
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200;
    cloud_group.add (cloud);
  }

}

//creating cactus
function create_cactus ()
{
  if (frameCount%90 == 0)
  {
    cactus = createSprite (width, height-20, 40, 40);
    cactus.velocityX = -(3 + score/100);
    cactus.scale = 0.45;
    cactus.lifetime = 300;
    var random_cactus = Math.round(random(1,6));
    obstacle_group.add(cactus);

    //switch statement for cactus
    switch (random_cactus)
    {
      case 1:
        cactus.addImage (obstacle1);
        break;

      case 2:
        cactus.addImage (obstacle2);
        break;

      case 3:
        cactus.addImage (obstacle3);
          break;

      case 4:
        cactus.addImage (obstacle4);
            break;

      case 5:
        cactus.addImage (obstacle5);
              break;

      case 6:
        cactus.addImage (obstacle6);
        break;

    }

  }
}

function reset()
{
  gamestate = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}
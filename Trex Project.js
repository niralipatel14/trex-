
//making variables
var trex ,trex_running, ground, ground_image;
//loading images and animations
function preload(){
trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");  
ground_image = loadImage ("ground2.png");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex = createSprite (50, 160, 20, 50);
 trex.addAnimation ("running",trex_running);
 trex.scale = 0.5;
edges = createEdgeSprites ();
ground = createSprite (200, 180, 400, 20);
ground.addImage (ground_image);

}

function draw(){
  background("white");
//when space bar is pressed, Trex will jump
  if (keyDown("space")) 
{
  trex.velocityY = -3;
}  
//gravity effect
trex.velocityY = trex.velocityY + 0.5;
trex.collide (ground);
ground.velocityX = -3;
//making the ground reset
if (ground.x<0)
{
  ground.x = ground.width/2;
}

//console.log (trex.y);

drawSprites ();
}

// title: pongo
// author: someone
// desc: ghsjsj
// script: js
function init(){
	lives=3;
	player = 
		{ x : (240/2)-12, 
			y : 120, 
			width : 24,
		 height :4, 
		 color : 3, 
		 speed : { x :0, max : 4 } };
//////////////ball////////////
	ball = {
  x : player.x+(player.width/2)-1.5,
  y : player.y-5,
  width : 3,
  height : 3,
  color : 14,
  deactive : true,
  speed : {
   x : 0,
   y : 0,
   max : 1.5
  }
 };
	//////////////bricks//////////
//bricks
 var bricks = [];
var  brickCountWidth = 19;
var  brickCountHeight = 12;

 //create bricks
 for(var i=0;i<= brickCountHeight;i=i+1){
  for(var j=0;j<= brickCountWidth;j=j+1){
   var brick = {
    x : 10+j*11,
    y : 10+i*5,
    width : 10,
    height : 4,
    color : i+1
   };
 	bricks.push(brick);
  }
 }	
}
init();

function TIC(){
	cls(13);
input();
if (lives>0){
	update();
	collisions();
	draw();
	}
else if(lives==0){
gameOver();
}
}

function input(){
	var sx=player.speed.x;
	var smax=player.speed.max;
	//move to left 
	if(btn(2)){
		if(sx>-smax){
			sx=sx-2;
			}
			else{
			sx=-smax;
			}
	}
 
 // move to right 
 if(btn(3)){
 	if(sx<smax){
				sx=sx+2;
				}
				else{
				sx=smax;
    }
 }
player.speed.x=sx;
player.speed.max=smax;
////////////////////////
		if (ball.deactive){
 	 ball.x = player.x+(player.width/2)-1.5;
 	 ball.y = player.y-5;
 	 if (btn(5)){
  	 ball.speed.x = Math.floor(Math.random())*2-1;
  	 ball.speed.y = -1.5;
  	 ball.deactive = false;
  }
 }
}

function update(){
var px = player.x;
var psx = player.speed.x;
var smax = player.speed.max;

px=px+psx;

if (psx != 0) {
     if (psx > 0){psx=psx-1;}
     else{psx=psx+1;} 
     }
player.x=px;
player.speed.x=psx;
player.speed.max=smax;
	///////////////
	// update ball position
 ball.x = ball.x + ball.speed.x;
 ball.y = ball.y + ball.speed.y;

 // check max ball speed
 if (ball.speed.x > ball.speed.max){
   ball.speed.x = ball.speed.max;
 }
}

function draw(){
	drawGameObjects();
	drawGUI();
}
function drawGameObjects(){
	rect(player.x,
			player.y,
			player.width,
			player.height,
			player.color);
			////////////ball/////////////
			 // draw ball
 rect(ball.x,
  ball.y,
  ball.width,
  ball.height,
  ball.color);
}
function drawGUI(){
}
function collisions(){
 //player <-> wall collision
 playerWallCollision();
	//
	ballWallCollision();
	//
	playerBallCollision();
	//
	ballGroundCollision();
}
function playerWallCollision(){
 if (player.x<0){
  player.x = 0;
		}
 else if(player.x+player.width>240){
  player.x = 240 - player.width;
 }
}
function ballWallCollision(){
 if(ball.y < 0){
  //top
  ball.speed.y = -ball.speed.y;
		}
 else if(ball.x < 0){
  //left
  ball.speed.x = -ball.speed.x;
		}
 else if(ball.x > 240 - ball.width) {
  // right
  ball.speed.x = -ball.speed.x;
 }
}
function collide(a,b){
 //get parameters from a and b
 var ax = a.x;
 var ay = a.y;
 var aw = a.width;
 var ah = a.height;
 var bx = b.x;
 var by = b.y;
 var bw = b.width;
 var bh = b.height;

//check collision
 if((ax < bx+bw)&&
 			(ax+aw > bx)&&
    (ay < by+bh)&&
    (ah+ay > by)) {
     // collision
     return true;
 }
 // no collision
 return false;
}
function playerBallCollision(){
 if(collide(player,ball)){
  ball.speed.y = -ball.speed.y;
  ball.speed.x = ball.speed.x + 0.3*player.speed.x;
 }
}

function ballGroundCollision(){
 if (ball.y > 136 - ball.width){
  // reset ball
  ball.deactive = true;
  // loss a life
  if (lives > 0) {
   lives = lives - 1;
			}
  else if(lives == 0){
   //game over
   gameOver();
  }
 }
}

function gameOver(){
 print("Game Over",(240/2)-6*4.5,136/2);
 spr(0,240/2-4,136/2+10);
  if(btn(5)){
   init();
  }
}

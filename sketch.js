var dog, happyDog,database,foodS,foodStock;

function preload()
{
  dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog=createSprite(200,200,50,50);
  dog.addImage(happyDog);
  dog.scale=0.5;
}


function draw() {  

  drawSprites();
  

}




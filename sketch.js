var dog,dogImg, happyDog,happyDogImg,database,foodS=0,foodStock;

function preload()
{
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(750, 650);
  database = firebase.database();
  console.log(database);
  
  dog=createSprite(200,200,50,50);
  dog.addImage(dogImg);
  dog.scale=0.5;

  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();

  textSize(12);
  fill("white");
  text("Food remaining :" +foodS,350,500)
}

function readStock(data) {
   foodS=data.val();
}

function writeStock(x) {

  if (x<=0) {
    x=0
  }else{
    x=x-1
  }
   database.ref('/').update({
     Food:x
   })
}

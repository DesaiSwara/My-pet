var dog,dogImg, happyDog,happyDogImg,database,foodS=0,foodStock;
var feedPet,addFood,fedTime,lastFed,foodObj,milk,hour,addFoodS;

function preload()
{
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(750, 650);
  foodObj=new Food (50,50,200,200); 
  database = firebase.database();
  console.log(database);
  
  dog=createSprite(200,200,50,50);
  dog.addImage(dogImg);
  dog.scale=0.5;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46, 139, 87); 

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  drawSprites();

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed:"+ lastFed%12 + "PM",350,30)
  }else if(lastFed===0) {
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed:"+ lastFed+"AM",350,30)
  }

  fill("white");
  textSize(12);
  text("Food remaining :" +foodS,550,30)
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

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog () {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}
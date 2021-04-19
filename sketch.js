var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;

function preload()
{
  //load images here
  backgroundImg = loadImage("bg.jpg");
  dogImage = loadImage("Dog.png");
  dogImage1 = loadImage("happydog.png");
  foodImage = loadImage("Milk.png");
  bathImage = loadImage("Wash Room.png");
  sleepImage = loadImage("Bed Room.png");
  playImage = loadImage("Living Room.png");
  walkImage = loadImage("running.png");
  

}

function setup() {
  createCanvas(480, 480);

  //Sprites

  food = createSprite(90,410,50,50);
  food.addImage(foodImage);
  food.scale = 0.15;


  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.35;

  //Firebase
  database = firebase.database();

  //Reference for food
  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);


}


function draw() {  
  background(backgroundImg);
  drawSprites();
  
  //add styles here
  textSize(27);
  stroke("fuchsia");
  strokeWeight(0);
  fill("fuchsia");
  text("Bottles in the Stock: "+foodStock,130,430);
  textSize(20);
  fill("fuchsia");
  strokeWeight(0);
    text("Press up arrow key - Feeding, space- Running ",50,40);
    text("Press right arrow key - Playing, left arrow key- Sleeping ",20,70);
    text("Press down arrow key - Washroom ",100,100);

  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }

  if(keyWentUp(DOWN_ARROW)){
    
    dog.addImage(bathImage);
    dog.scale = 0.98;
    
    
  }

  if(keyWentUp(LEFT_ARROW)){
   
    dog.addImage(sleepImage);
    dog.scale = 1.1
    
    
  }

  if(keyWentUp(RIGHT_ARROW)){
   
    dog.addImage(playImage);
    dog.scale = 1
    dog.x = 250-10;
    dog.y = 250-80;
    
    
  }

  if(keyCode === 32){
    
    dog.addImage(walkImage);
    dog.scale = 0.45
 }

}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  
  dog.scale = 0.35;
 

  }
  
  if(keyWentUp(UP_ARROW)){
    
    foodStock = foodStock;
    dog.addImage(dogImage);
    fill("yellow");

    dog.scale = 0.35;
    food.x = 90;
    food.y = 410;
    food.scale = 0.15;
    
  }
}

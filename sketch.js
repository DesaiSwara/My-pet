var dog,dogImg, happyDog,happyDogImg,database,foodS=0,foodStock;
var feedPet,addFood,fedTime,lastFed,milk,addFoodS;
var foodObj;

function preload()
{
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);
  foodObj=new Food (50,50,200,200); 

  var title=createElement('h2');
        title.html("Virtual Pet");
        title.position(500,0);
        var input=createInput("Name");
        var button=createButton("Play");
      
        input.position(500,50);
        button.position(500,100);
        button.mousePressed(function(){
            input.position(500,440)
;            button.hide();
            
        }) 
  
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
  foodObj.display();
  

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  fill("white");
  textSize(12);
  text("Food remaining :" +foodS,550,30);

  drawSprites();
}

function readStock(data) {
   foodS=data.val();
   foodObj.updateFoodStock(foodS)
}



function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

  
  

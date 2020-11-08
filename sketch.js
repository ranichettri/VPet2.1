//Create variables here
var dog,happyDog,database,foodS,foodStock;
var fedTime,lastFed;
var foodObj;

function preload(){
  doggyHappy = loadImage("images/dogImg.png")
  doggy = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  dog = createSprite(500,300,50,50);
  dog.addImage(doggy);
  dog.scale= 0.3;

    
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError)
  
  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {  
  background(46,139,87);
  foodObj.display();
  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastFed = data.val();
  })
    
    //add styles here
    
    fill(255,255,254);
    textSize(20);
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);
     }else if(lastFed==0){
       text("Last Feed : 12 AM",350,30);
     }else{
       text("Last Feed : "+ lastFed + " AM", 350,30);
     }
  drawSprites();
  }
  
 
  function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }
  
 
  
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }
  
 
  function feedDog(){
    dog.addImage(doggyHappy);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }
  
  
  
  function showError(){
    console.log("ERROR");
  }
  
  

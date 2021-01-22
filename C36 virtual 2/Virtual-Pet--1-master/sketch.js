//Create variables here

var dog, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;
var feedBtn, addFoodBtn;


function preload(){
   dogImg=loadImage("images/dogImg.png")
   dogImg1=loadImage("images/dogImg1.png")
  }
  
function setup() {
	createCanvas(500, 500);
  
  dog=createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.1

  foodObj=new Food();
   
  feedBtn=createButton('Feed');
  feedBtn.position(350+212,50+27);
  

  addFoodBtn=createButton('Add Bottle');
  addFoodBtn.position(350+280,50+27);
  addFoodBtn.mousePressed(addFood);
 

  input=createInput('');  
  input.width="20%";
  input.position(350+20,50+31);
  
  
  nameeBtn=createButton('Click to give name');
  nameeBtn.position(350+20,50+60);
  nameeBtn.mousePressed(function(){
    dogName=input.value();   
    greeting=createElement('h2');
    greeting.position(350+62,50+74)
    greeting.html(dogName+" !")
    nameeBtn.hide(); input.hide();
  } );

  database=firebase.database();

  

  lastFedd=database.ref('dog/lastFed');
  lastFedd.on("value",function(data){
    lastFed=data.val();
  })

}

function draw() {  

  background(46, 139, 87)
  feedBtn.mousePressed(feedDog);

  fill(255)
  text(mouseX+" "+mouseY,mouseX,mouseY)  

  // if(keyWentDown("up")){
  //   foodS-=1;
  //   writeStock();
  //   dog.addImage(dogImg1)
  // }
  drawSprites();

  foodObj.getFoodStock();
  foodObj.display();

  var lastFedTime=database.ref('dog/lastFed');
  lastFedTime.on("value",function(data)
  {  
    lastFed=data.val();           
  })

  fill(255)
  if(foodS!=undefined){
    textSize(20)
    text("Food remaining : "+foodS,267,150);

    if(lastFed<=12){
      text("Last fed time : "+lastFed+" AM",267,82);
    }else{text("Last fed time : "+(24-lastFed)+" PM",267,82);}
    

  }

  
  
  //add styles here

}

function writeStock() {  

  if(foodS<0){
    foodS=0
    foodObj.bottles=[]
  }
    database.ref('dog').set({
    Food:foodS
  })
}
function addFood() {  
  
    database.ref('dog').update({
      Food:foodS+1
    })

    console.log(foodS)
  
  

}
function feedDog() {  
  if(foodS){
    foodObj.updateFoodStock();  
    var hourr=hour();  
    database.ref('dog').update({
      lastFed:hourr
    })
    dog.addImage(dogImg1)
    

    dog.x=foodObj.bottles[foodObj.bottles.length-1][0];
    dog.y=foodObj.bottles[foodObj.bottles.length-1][1];
    foodObj.bottles.pop();

    console.log(foodS)
  }
  

}

// function keyPressed(){
//   if (keyCode===32){
//     foodS-=1;
//       writeStock();
//       dog.addImage(dogImg1)
//       console.log(foodS)
//   }
// }



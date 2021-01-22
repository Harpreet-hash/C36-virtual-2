class Food{
    constructor(){
        this.milk=loadImage("images/Milk.png");
        this.foodStock;
        this.lastFed;
        this.bottles=[];
    }
    getFoodStock(){
        var localStock=database.ref('dog/Food');
        localStock.on("value",function(data) {  

            foodS=data.val(); 
          
          })

    }
    updateFoodStock(){
        database.ref('dog').update({
            Food:foodS-1
          })

    }
    deductFood(){

    }
    display(){

        var x=200;
        var y=300;

        for(var i=0;i<foodS;i++){
            

            // console.log(foodS)

            if(x>=400){
                y+=50;
                x=200;
            }
            image(this.milk,x,y,40,40);
            this.bottles.push([x,y]);
            x+=30;
          
            
        }
    }
}
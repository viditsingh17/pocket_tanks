

//Smile we are making pocket tanks


let c1,c2;

//game elements
let bullet;
let g;
let force, angle;
let isShot;
let turn = 0;

let t1, t2;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    noStroke();
    g = createVector(0,0.2);
    
    isShot = false;
    force = 2;
    angle = Math.PI/4

    c1 = new Controller(50,50);
    c2 = new Controller(width/2 + 50 ,50);

    t1 = new Tank(-width/4,200, true, c1);
    t2 = new Tank(width/4,200, false, c2);

}

function draw(){
    background(23, 33, 43);
   if(isShot){
    bullet.draw();
    bullet.update();
    bullet.applyForce(g);
   }

//    angle = c1.getAngle();
//    force = c1.getForce();
   if(turn%2==0){
        t1.setAngle();
        t1.setForce();
   }
   else{
    t2.setAngle();
    t2.setForce();
   }

   c1.listenButton();
   c2.listenButton();

   t1.draw();
   t1.update();
   t2.draw();
   t2.update();
   
}
//draw ends

//Gameplay logic is defined in here

// function play(){
//     if(turn%2==0){
//         t1.shoot();
        
//     }
//     else{
//         t2.shoot();
        
//     }
   
//     turn++;
    
// }

function moveLeft(){
    console.log("Left is called");
    if(turn%2==0){
        t1.moveLeft(10);
        
    }
    else{
        t2.moveLeft(10);
        
    }
}

function moveRight(){
    console.log("Right is called");
    if(turn%2==0){
        t1.moveRight(10);
        
    }
    else{
        t2.moveRight(10);
        
    }
}



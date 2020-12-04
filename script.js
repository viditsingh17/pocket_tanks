

//Smile we are making pocket tanks
//red: rgb(255, 107, 107)   #ff6b6b
//blue: rgb(34, 166, 179)   #22a6b3

let c1,c2;

let ground;

//game elements
let bullet;
let g;
let force, angle;
let turn = 0;

let t1, t2;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    noStroke();
    g = createVector(0,0.2);
    translate(-width/2, -height/2);
    
    force = 2;
    angle = Math.PI/4

    bullet = new Bullet();
    
    c1 = new Controller(width-220, 50, true);
    c2 = new Controller(width-220 ,50, false);

    ground = new Ground(200,600);
    

    t1 = new Tank(-280, height/2 - 300, true, c1, true);
    t2 = new Tank(280, height/2 - 300, false, c2, false);   

    //setting up for RED
    c2.hide();
    c1.show();
    document.getElementById("message").innerHTML = "RED'S TURN";
}




function draw(){

  
    background(23, 33, 43);
   if(bullet.isShot){
    bullet.draw();
    bullet.update();
    bullet.applyForce(g);
   }

   smooth();
   //origin
   circle(0,0,2);

   fallOnGround(bullet.pos.x, bullet.pos.y);
   ground.draw();


   if(turn%2==0){
        t1.setAngle();
        t1.setForce();
        
   }
   else{
        t2.setAngle();
        t2.setForce();
   }

   t1.collision();
   t2.collision();

   if(keyIsDown(LEFT_ARROW)){
       moveLeft();
   }
   else if(keyIsDown(RIGHT_ARROW)){
       moveRight();
   }
   else if(keyIsDown(UP_ARROW) || keyIsDown(87)){
       if(turn%2==0){
            c1.forceSlider.value(c1.forceSlider.value()+0.1);
       }
       else{
            c2.forceSlider.value(c2.forceSlider.value()+0.1);
       }
   }
   else if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    if(turn%2==0){
        c1.forceSlider.value(c1.forceSlider.value()-0.1);
    }
    else{
        c2.forceSlider.value(c2.forceSlider.value()-0.1);
        }
    }
    else if(keyIsDown(65)){
        if(turn%2==0){
             c1.angleSlider.value(c1.angleSlider.value()+ (Math.PI/180));
        }
        else{
             c2.angleSlider.value(c2.angleSlider.value()+ (Math.PI/180));
        }
    }
    else if(keyIsDown(68)){
        if(turn%2==0){
            c1.angleSlider.value(c1.angleSlider.value()- (Math.PI/180));
        }
        else{
         c2.angleSlider.value(c2.angleSlider.value()- (Math.PI/180));
         }
    }
   t1.draw();
   t1.update();
   t2.draw();
   t2.update();
   
}
//draw ends


function mouseClicked(){
    ground.blastOff(mouseX);
}

function keyPressed(){
    if(keyCode == 32){
        play();
    }
}

function play(){
    if(turn%2==0){
        t1.shoot();
        c1.hide();
        c2.show();
        document.getElementById("message").innerHTML = "BLUE'S TURN";
    }
    else{
        t2.shoot();
        c2.hide();
        c1.show();
        document.getElementById("message").innerHTML = "RED'S TURN";
    }
   
    turn++;
    
}

function moveLeft(){
    console.log("Left is called");
    if(turn%2==0){
        t1.moveLeft(1);
        
    }
    else{
        t2.moveLeft(1);
        
    }
}

function moveRight(){
    console.log("Right is called");
    if(turn%2==0){
        t1.moveRight(1);
        
    }
    else{
        t2.moveRight(1);
        
    }
}

function fallOnGround(x,y){
    let index = Math.floor(x/ground.w);
    if(y > ( height/2 - ground.getHeight(index) - 5)&& y < (height/2 - ground.getHeight(index) + 5)){
        // console.log("Fall");
        if(!bullet.exploded){
            ground.blastOff(x+width/2);
            bullet.explode();
        }
    }
}



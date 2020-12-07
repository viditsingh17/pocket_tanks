

//Smile we are making pocket tanks
//red: rgb(255, 107, 107)   #ff6b6b
//blue: rgb(34, 166, 179)   #22a6b3

let c1,c2;

let ground;

//game elements
let bullet;
let g;      //g that affects bullets
let tankG;  //g that affects tanks
let lift;   //lift that the tank experience
let force, angle;
let turn = 0;

let t1, t2;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    noStroke();
    g = createVector(0,0.2);        //0.2
    tankG = createVector(0,10);
    lift = createVector(0,-0.06);
    translate(-width/2, -height/2);
    
    force = 2;
    angle = Math.PI/4

    bullet = new Bullet();
    bullet.exploded = true;
    
    c1 = new Controller(width-220, 50, true);
    c2 = new Controller(width-220 ,50, false);

    ground = new Ground(200,600);
    for(let i=0;i<5;i++){
        ground.blastOff(random(width/2 - 200, width/2 + 200));
    }
    

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
   isGameOver();
   
}
//draw ends


// function mouseClicked(){
//     ground.blastOff(mouseX);
// }

function keyPressed(){
    if(keyCode == 32){
        play();
    }
    if(keyCode == 72){
        let ele = document.getElementById('text_matter');
        if(ele.style.visibility == 'hidden'){
            ele.style.visibility = 'visible';
        }
        else{
            ele.style.visibility = 'hidden';
        }
    }
    if(keyCode == 82){
        location.reload();
    }
}

function play(){
    if(turn%2==0){
        if(bullet.exploded){
            t1.shoot();
            c1.hide();
            c2.show();
            document.getElementById("message").innerHTML = "BLUE'S TURN";
            turn++;
        }
        
    }
    else{
       if(bullet.exploded){
        t2.shoot();
        c2.hide();
        c1.show();
        document.getElementById("message").innerHTML = "RED'S TURN";
        turn++;
       }
    }
   
    
    
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

function isGameOver(){
    if(t1.hp==0){
        winner('blue');
        return true;
    }
    else if(t2.hp==0){
        winner('red');
        return true;
    }
    return false;
}

function winner(str){
    let ele = document.getElementById("message");
    ele.style.fontSize = '3em';
    document.getElementById('sub_message').style.visibility = 'visible';
    if(str == 'red'){
        ele.innerHTML = "RED WON!";
    }
    else{
        ele.innerHTML = "BLUE WON!";
    }
}

function fallOnGround(x,y){
    x = x + width/2;
    if(y > ( height/2 - ground.getHeight(x) - 5)&& y < (height/2 - ground.getHeight(x) + 5)){
        console.log("Fall");
        if(!bullet.exploded){
            ground.blastOff(x);
            bullet.explode();
        }
    }
}



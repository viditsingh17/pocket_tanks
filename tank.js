class Tank{
    constructor(x,y, isFacingRight, controller){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.isFacingRight = isFacingRight;
        this.angle = angle;
        this.force = force;
        this.controller = controller;
    }

    setForce(){
        this.force = this.controller.getForce();;
    }

    setAngle(){
        if(this.isFacingRight){
            this.angle = this.controller.getAngle();
        }
        else{
            this.angle = Math.PI - this.controller.getAngle();
        }
    }

    moveLeft(tab){
        this.vel.x -= tab;
    }
    moveRight(tab){
        this.vel.x += tab;
    }

    draw(){

        //body
        push();
        rectMode(CENTER);
        fill(220,200,190);
        rect(this.pos.x, this.pos.y, 60, 16);
        pop();

        //barrel
        push();
        translate(this.pos.x, this.pos.y - 10);
        fill(0,130,220);
        rotateZ(-this.angle);
        
        rect(0,-4, 40, 8);
        pop();

        //turret
        fill(220,200,190);
        circle(this.pos.x, this.pos.y-10, 30,);

        //treads
        push();
        rectMode(CENTER);
        fill(0,130,220);
        rect(this.pos.x, this.pos.y + 13, 50, 10);
        circle(this.pos.x + 27, this.pos.y+13, 10,);
        circle(this.pos.x - 27, this.pos.y+13, 10,);
        pop();
    }

    update(){
        this.pos.add(this.vel);
        this.vel.mult(0);
    }

    shoot(){
        // force = this.controller.getForce();
        // angle = this.controller.getAngle();
        bullet = new Bullet(this.pos.x + 40 * Math.cos(this.angle), this.pos.y - 10 - 40 * Math.sin(this.angle), this.force, this.angle, this.isFacingRight);
        
        isShot = true;
    }

}
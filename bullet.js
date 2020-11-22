class Bullet{
    constructor(x, y, force, angle, isFacingRight){
        this.m = 2;
        this.isFacingRight = isFacingRight;
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this. angle = angle;
        this.force = force;
        this.isShot = false;

        this.acc.x += this.force*Math.cos(this.angle);
        this.acc.y -= this.force*Math.sin(this.angle);
    }

    applyForce(force){
        this.acc.add(force);
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.acc.mult(0);
    }

    explode(){
        //the bullet explodes and the bullet object is destroyed.
        //New bullet shouldn't be able to fire unless the prevous bullet has exploded.
        console.log("EXPLODED!");
    }

    draw(){
        push();
        noStroke();
        fill(220, 50, 100);
        circle(this.pos.x, this.pos.y, 10);
        pop();
    }
}
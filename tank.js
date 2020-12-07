class Tank{
    constructor(x,y, isFacingRight, controller, isRed){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.isFacingRight = isFacingRight;
        this.angle = angle;
        this.force = force;
        this.controller = controller;
        this.isRed = isRed;
        this.hp = 100;
        this.guides = [4];
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
        let leftBarHeight = height/2 - ground.getHeight(this.pos.x - 2 + width/2);
        if(this.pos.x - 30>=-width/2){
            if((this.pos.y + 6) <= leftBarHeight)
                this.vel.x -= tab;
            else if((this.pos.y + 3) <= leftBarHeight)
            {
                this.vel.x -= tab;
                this.vel.add(lift);
            }
        }
    }
    moveRight(tab){
        let rightBarHeight = height/2 - ground.getHeight(this.pos.x + 2  + width/2);
        if(this.pos.x + 30 <=width/2){
            if((this.pos.y + 6) <= rightBarHeight){
                this.vel.x += tab;
            }
            else if((this.pos.y + 3) <= rightBarHeight)
            {
                this.vel.x += tab;
                this.vel.add(lift);
            }
        }
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
        if(this.isRed){
            fill(255, 107, 107);
        }
        else{
            fill(34, 166, 179);
        }
        rotateZ(-this.angle);
        push();
        fill(255);
        for(let i=0; i<4; i++){
            circle(40 + 2*this.force*i , 0, 2);
        }
        pop();
        rect(0,-4, 40, 8);
        
        pop();

        //turret
        push();
        fill(220,200,190);
        circle(this.pos.x, this.pos.y-10, 30,);
        pop();

        //treads
        push();
        rectMode(CENTER);
        if(this.isRed){
            fill(255, 107, 107);
        }
        else{
            fill(34, 166, 179);
        }
        rect(this.pos.x, this.pos.y + 13, 50, 10);
        circle(this.pos.x + 27, this.pos.y+13, 10,);
        circle(this.pos.x - 27, this.pos.y+13, 10,);
        pop();

        //hp
        push();
        rectMode(CENTER);
        fill(225, 10, 50);
        rect(this.pos.x, this.pos.y + 40, 100, 10);
        pop();

        push();
        rectMode(CORNER);
        fill(22, 160, 133);
        rect(this.pos.x-50, this.pos.y + 35, this.hp, 10);
        pop();
    }

    update(){
        if(this.pos.y + 18 <= height/2 - ground.getHeight(this.pos.x + width/2)){
            this.pos.add(this.vel);
            this.vel.add(tankG);
        }

        if(this.pos.y+18 >= height/2){
            if(this.isRed)
                winner('blue');
            else
                winner('red');
        }
        this.pos.add(this.vel);
        this.vel.mult(0);
        this.collision();
    }

    shoot(){
        // force = this.controller.getForce();
        // angle = this.controller.getAngle();
        bullet = new Bullet(this.pos.x + 40 * Math.cos(this.angle), this.pos.y - 10 - 40 * Math.sin(this.angle), this.force, this.angle, this.isFacingRight); 
        bullet.isShot = true;
    }

    collision(){
        if(bullet.pos.x >= this.pos.x-30 && bullet.pos.x <= this.pos.x+30 && bullet.pos.y>this.pos.y-8 && bullet.pos.y<=this.pos.y+8){
            if(!bullet.exploded){
                if(this.hp>=20){
                    this.hp -= 20;
                }
                else{
                    this.hp = 0;
                }
            }
            bullet.explode();
            console.log(this.hp);
        }

        if(bullet.pos.x >= this.pos.x-15 && bullet.pos.x <= this.pos.x+15 && bullet.pos.y>this.pos.y-15 && bullet.pos.y<=this.pos.y-5){
            if(!bullet.exploded){
                //critical hit
                if(this.hp>=40){
                    this.hp -= 40;
                }
                else{
                    this.hp = 0;
                }
            }
            bullet.explode();
            console.log(this.hp);
        }
    }

}
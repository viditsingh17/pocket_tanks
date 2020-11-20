
class Controller{
    constructor(x,y){
        this.position = createVector(x,y);
        this.shootButton = createButton('Shoot');
        this.leftButton= createButton('Move Left');
        this.rightButton = createButton('Move Right');
        this.forceSlider = createSlider(2, 16, force, 0.1);
        this.angleSlider = createSlider(0, Math.PI, angle, Math.PI/1000);
        this.text1 = createP('Force');
        this.text2 = createP('Angle');
        
        this.shootButton.position(this.position.x, this.position.y + 40);
        this.forceSlider.position(this.position.x, this.position.y + 70);
        this.text1.position(this.position.x + 140, this.position.y +70);
        this.angleSlider.position(this.position.x, this.position.y + 100);
        this.text2.position(this.position.x + 140, this.position.y +100);
        this.leftButton.position(this.position.x, this.position.y + 130);
        this.rightButton.position(this.position.x + 80, this.position.y+ 130);
        
        this.text1.style('color', '#ffffff');
        this.text1.style('font-size', '14px');
        this.text2.style('color', '#ffffff');
        this.text2.style('font-size', '14px');
        this.shootButton.mousePressed(()=>{
            if(turn%2==0 && this == t1.controller){
                t1.shoot();
                        
            }
            else{
                t2.shoot();
                        
            }
                   
            turn++;
        });
       
    }

    listenButton(){
        this.leftButton.mousePressed(moveLeft);
        this.rightButton.mousePressed(moveRight);
    }

    getAngle(){
        return this.angleSlider.value();
    }

    getForce(){
        return this.forceSlider.value();
    }
}

class Controller{
    constructor(x,y, isRed){
        this.position = createVector(x,y);
        this.shootButton = createButton('Shoot!');
        this.forceSlider = createSlider(2, 16, force, 0.1);
        this.angleSlider = createSlider(0, Math.PI, angle, Math.PI/1000);
        this.name = createP('CONSOLE');
        this.text1 = createP('Force');
        this.text2 = createP('Angle');
        this.isRed = isRed;
        
        this.name.position(this.position.x, this.position.y);
        this.shootButton.position(this.position.x, this.position.y + 100);
        this.forceSlider.position(this.position.x, this.position.y + 30);
        this.text1.position(this.position.x + 140, this.position.y + 30);
        this.angleSlider.position(this.position.x, this.position.y + 60);
        this.text2.position(this.position.x + 140, this.position.y + 60);
        

        this.text1.style('color', '#ffffff');
        this.text1.style('font-size', '14px');
        this.text2.style('color', '#ffffff');
        this.text2.style('font-size', '14px');
        this.name.style('font-weight', '800');
        if(this.isRed){
            this.shootButton.style('background', '#ff6b6b');
            this.name.html('RED CONSOLE');
            this.name.style('color', '#ff6b6b');
            this.forceSlider.style('cursor', 'pointer');
        }
        else{
            this.shootButton.style('background', '#22a6b3');
            this.name.style('color', '#22a6b3');
            this.name.html('BLUE CONSOLE');
        }
        
        this.forceSlider.style('background', '')
        this.shootButton.style('color', '#fff');
        this.shootButton.style('font-weight', '800');
        this.shootButton.style('font-size', '1em');
        this.shootButton.style('width', '180px');
        this.shootButton.style('margin', 'auto');
        this.shootButton.style('padding', '8px 20px');
        this.shootButton.style('border-radius', '5px');
        this.shootButton.style('border', 'none');
        this.shootButton.mousePressed(play);
       
    }
    hide(){
        this.name.hide();
        this.shootButton.hide();
        this.forceSlider.hide();
        this.angleSlider.hide();
        this.text1.hide();
        this.text2.hide();
    }

    show(){
        this.name.show();
        this.shootButton.show();
        this.forceSlider.show();
        this.angleSlider.show();
        this.text1.show();
        this.text2.show();
    }

    getAngle(){
        return this.angleSlider.value();
    }

    getForce(){
        return this.forceSlider.value();
    }
}
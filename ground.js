class Ground{
    constructor(initial, n=600){
        this.ground = [];
        this.n = n;
        this.w = width/this.n;

        this.ground[0] = initial;
        for(let i=0;i<this.n;i++){
            this.ground[i] = 100 + Math.sin(i/20) * 5;
        }
    }

    getHeight(x){
        let index = Math.floor(x/this.w);
        return index;
    }
    blastOff(x){

        let index = this.getHeight(x);
        let bh = random(10, 80);
        let r = random(1,4);
        for(let i=0;i<this.n;i++){
            if(this.ground[i] + Math.pow((index-i)/2,2)/r - bh < this.ground[i]){
                this.ground[i] = this.ground[i] + Math.pow((index-i)/2,2)/r - bh;
            }
        }
    }

    draw(){

        push();
        for(let i=0;i<this.n;i++){
            fill(80,i/2 + 30,20 + i/2);
            rect(this.w*i-width/2, height/2-this.ground[i], this.w, this.ground[i]);
            // 
        }
        pop();
    }
}
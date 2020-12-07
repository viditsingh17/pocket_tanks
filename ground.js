class Ground{
    constructor(initial, n=600){
        this.ground = [];
        this.n = n;
        this.w = width/this.n;

        this.ground[0] = initial;
        for(let i=0;i<this.n;i++){
            this.ground[i] = initial + Math.sin(i/20) * 5;
        }
    }

    getHeight(x){
        let index = Math.floor(x/this.w);
        return this.ground[index];
    }
    blastOff(x){

        let index = Math.floor(x/this.w);
        let bh = random(30, 80);
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
            fill(121,85,72);
            rect(this.w*i-width/2, height/2-this.ground[i], this.w, this.ground[i]);
            // 
        }
        pop();
    }
}
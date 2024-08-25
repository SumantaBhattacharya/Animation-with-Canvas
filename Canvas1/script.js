const canvas = document.querySelector("#canvas1")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

let hue = 0;// HSL COLOR HUE SATURATION LIGHTNESS 

window.addEventListener('resize', function name(params) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function Mouse(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let index = 0; index < 100; index++) {
        particlesArray.push(new Particle());
        
    }
    


})

canvas.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;

    for (let index = 0; index < 5; index++) {
        particlesArray.push(new Particle());
        
    }

})

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 1; //15
        this.speedX = (Math.random() * 3) - 1.5;
        this.speedY = (Math.random() * 3) - 1.5;
        this.color =  'hsl(' + hue + ', 100%, 50%)'; // by this contructor assign new color when they are created 
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.2){// 0.2 digrees
            this.size -= 0.1; // this.size = this.size - 0.1
            // this.size cannot go below zero this why we are assigning 0.1 and starting it from 0.2
        }
    }

    draw(){
        ctx.fillStyle = this.color;//'hsl(' + hue + ', 100%, 50%)'
        ctx.strokeStyle = 'hsl';// 0-360 0 is red 120 is green 240 is blue, saturation 0% is grey and 100% is full color, 0 is black 100% is white
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }


}

// function init(params) {
//     for (let index = 0; index < 100; index++) {
//         particlesArray.push(new Particle())
        
//     }
// }

// init();

function handleParticles(params) {
    for (let index = 0; index < particlesArray.length; index++) {
        particlesArray[index].update();
        particlesArray[index].draw();
        
        if(particlesArray[index].size <= 0.3){
            particlesArray.splice(index,1);// delete only 1 element from this index
            index--;
        }
    }
}

function animate(params) {
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles()
    // hue++;
    hue+=5 // by this color will change fast
    //hue+=0.5; // color will change very showly
    requestAnimationFrame(animate);
    

}

animate();




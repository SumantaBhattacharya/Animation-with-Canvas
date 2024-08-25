const canvas = document.querySelector("#canvas1")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

window.addEventListener('resize', function name(params) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = 'white';
    // ctx.fillRect(10, 10, 150, 50);
    // 10 horizontal X and 10 Vertical y position width and height of the rectrangle
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function Mouse(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    
    // drawCircle();

})

canvas.addEventListener("mousemove", (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;


    // drawCircle();
})

// function drawCircle(params) {
//     ctx.fillStyle = 'blue';
//     ctx.strokeStyle = 'red';
//     ctx.lineWidth = 5;
//     ctx.beginPath();
//     // ctx.arc(100, 100, 50, 0, Math.PI * 2);
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.stroke();
//     ctx.line();
// }

class Particle{
    constructor(){
        // this.x = mouse.x
        // this.y = mouse.y
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 1;
        this.speedX = (Math.random() * 3) - 1.5;
        this.speedY = (Math.random() * 3) - 1.5;

        
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        // this.y = this.y + this.speedY;

    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x,this.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // ctx.line();
    }
}

function init(params) {
    for (let index = 0; index < 100; index++) {
        particlesArray.push(new Particle())
        
    }
}

init();

function handleParticles(params) {
    for (let index = 0; index < particlesArray.length; index++) {
        particlesArray[index].update();
        particlesArray[index].draw();

    }
}

function animate(params) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles()
    requestAnimationFrame(animate);
    
    
    // drawCircle();
}

animate();



// x and y cordinates radius of the circle start angle end angle(360 degrees so full circle)
// it will take x and y cordinates as a central point and radiuus will be used as distance from the curved lines that center point
// start angle will determine where along the circle path i want to start drawing from and entire circle

// ctx.beginPath(); to place my paint brush and start drawing
// we have to do this beacause single shape can be made of multiple lines
// so .beginPath() lets js know we are startinga a new shape that is not connected to the previous lines if there are any

// context
// GetContext will only work if called on a variable that refers to canvas element
// GetContext will return a reference to built-in canvas 2d drawing api object
// canvas.width = window.innerWidth; to make sure canvas covers the entire browser window horizontally
// canvas.height = window.innerHeight; to make sure canvas covers the entire browser window vertically

// requestAnimationFrame is a built in function calls function we pass it as a argument, it calls it only once



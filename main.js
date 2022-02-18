//Script references "canvas" which calls "getContext" method to give us a context or canvas that we can draw on
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//These represent the canvas width/height to fill the browser's viewport to display the bouncing balls
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//Helper functions that return a random number in the range to change the color of the balls represented as a string
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


class Ball {

   //X and Y coordinates for vertical/horizontal starting points from top left to bottom right of viewport
   //velX and velY give each ball horizontal and vertical velocity which add to the X and Y cordinates to move them on screen
   //color sets each ball to a color
   //size gives each ball a radius in pixels
   constructor(x, y, velX, velY, color, size) {
       this.x = x;
       this.y = y;
       this.velX = velX;
       this.velY = velY;
       this.color = color;
       this.size = size;
    }
    
    //ctx is the variable the defines the canvas as set above
    //beginPath states we want to draw a shape on the paper
    //fillStyle defines the color off the shape which we set to our ball's color
    //arc is a method to trace an arc shape on the canvas which is set to 2*PI which is equivalent to 360 degrees. Must specify in radians as 1*PI would be half circle
    //fill just fills the drawing path we made (a circle) with color specified in fillStyle
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }

      //This actually moves the ball up, down, left, right, and bounces it off the edge of screen
      update() {
        if ((this.x + this.size) >= width) {
           this.velX = -(this.velX);
        }
     
        if ((this.x - this.size) <= 0) {
           this.velX = -(this.velX);
        }
     
        if ((this.y + this.size) >= height) {
           this.velY = -(this.velY);
        }
     
        if ((this.y - this.size) <= 0) {
           this.velY = -(this.velY);
        }
     
        this.x += this.velX;
        this.y += this.velY;
     }     
      
     collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
   
            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }
   
 }

 //creates new instance of the ball to use random values
 const balls = [];

 //can change the mount of balls to "push" around
while (balls.length < 100) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
}

//sets the canvas fill color and draws a rectangle across the canvas with fillRect
//also produces the trails behind the balls
//loops the balls and runs their draw and update functions to draw each on screen
function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0, width, height);

   for (const ball of balls) {
     ball.draw();
     ball.update();
     ball.collisionDetect();
   }

   requestAnimationFrame(loop);
}

 loop();
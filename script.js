const canvas = document.querySelector('canvas');
const c =  canvas.getContext('2d');
const colors = ["#D00000","#FFBA08", "#370617", "white", "#F48C06"];
canvas.width = innerWidth;
canvas.height = innerHeight;
class Circle{
  static radius = 15;
  constructor({position,velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = Math.random() * 15 + 15;
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.minRadius = 4;
    this.maxRadius = 30;
    this.friction = Math.random() * 0.5+ 0.3;
  }
  draw () {
    c.beginPath();
    c.arc(this.position.x, this.position.y,this.radius, 0,Math.PI * 2)
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x;
    if (this.position.y + this.radius + this.velocity.y >= innerHeight) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += 1;
    }
    if (this.position.x + this.radius >= innerWidth || this.position.x - this.radius <= 0) {
      this.velocity.x = -this.velocity.x;
    }
  }
}
let circles = [];
function intialize() {
  circles = [];
  for (let i = 0; i <= 400; i++) {
    circles.push(new Circle({
      position: {
        x: Math.random() * (innerWidth - Circle.radius * 2) + Circle.radius,
        y: Math.random() * (innerHeight / 1.8)
      },
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: 10
      }
    }))
  }
}
intialize();
function animate() {
  c.clearRect(0,0,innerWidth, innerHeight )
  requestAnimationFrame(animate);
  circles.map(circle => {
    circle.update();
  })
}
animate();  
addEventListener("click", () => {
  intialize();
}) 
addEventListener("resize", () => {
  intialize();
})
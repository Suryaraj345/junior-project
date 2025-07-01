const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 2 + 1;
  this.alpha = 1;

  this.draw = function () {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  this.update = function () {
    this.y -= this.speed;
    this.alpha -= 0.01;
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    hearts.push(new Heart(e.clientX, e.clientY));
  }
});

animate();
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let lastX = null;
let lastY = null;

function draw(x, y) {
  if (lastX === null) {
    lastX = x;
    lastY = y;
    return;
  }

  ctx.strokeStyle = "rgba(29, 185, 84, 0.25)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

window.addEventListener("mousemove", (e) => {
  draw(e.clientX, e.clientY);
});

window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  draw(touch.clientX, touch.clientY);
});

window.addEventListener("mouseout", () => {
  lastX = lastY = null;
});

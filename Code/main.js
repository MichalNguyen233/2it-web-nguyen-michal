// Získání canvasu a kontextu
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

// Neon efekt
ctx.globalCompositeOperation = "lighter";

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Proměnné pro poslední pozici kurzoru
let lastX = null;
let lastY = null;

// Funkce kreslení
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

// Události myš + touch
window.addEventListener("mousemove", (e) => draw(e.clientX, e.clientY));
window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  draw(touch.clientX, touch.clientY);
});

// Reset pozice
window.addEventListener("mouseout", () => {
  lastX = lastY = null;
});

// Pomalu mazání čar pro fade-out efekt
setInterval(() => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 40);

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* NEON MIX */
ctx.globalCompositeOperation = "lighter";

let lastX = null;
let lastY = null;
let lastDrawTime = Date.now();

/* KRESLENÍ */
function draw(x, y) {
  lastDrawTime = Date.now();

  if (lastX === null) {
    lastX = x;
    lastY = y;
    return;
  }

  // vnitřní čára
  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.55)";
  ctx.lineWidth = 1.6;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(29,185,84,0.9)";
  ctx.shadowBlur = 10;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // glow aura
  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.25)";
  ctx.lineWidth = 4;
  ctx.shadowBlur = 22;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

/* INPUT */
window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));
window.addEventListener("touchmove", e => draw(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
window.addEventListener("mouseout", () => {
  lastX = null;
  lastY = null;
});

/* PLYNULÉ ČIŠTĚNÍ */
function fadeCanvas() {
  const elapsed = Date.now() - lastDrawTime;

  const fade = elapsed > 3000 ? 0.2 : 0.04;

  ctx.shadowBlur = 0;
  ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(fadeCanvas);
}

fadeCanvas();

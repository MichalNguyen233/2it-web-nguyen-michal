const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

/* NEON MIX */
ctx.globalCompositeOperation = "lighter";

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

let lastX = null;
let lastY = null;
let lastDrawTime = Date.now();

/* KRESLENÍ – SILNĚJŠÍ SVIT */
function draw(x, y) {
  lastDrawTime = Date.now();

  if (lastX === null) {
    lastX = x;
    lastY = y;
    return;
  }

  // vnitřní ostrá čára
  ctx.strokeStyle = "rgba(29,185,84,0.6)";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(29,185,84,0.8)";
  ctx.shadowBlur = 12;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // vnější glow (měkká aura)
  ctx.strokeStyle = "rgba(29,185,84,0.25)";
  ctx.lineWidth = 4.5;
  ctx.shadowBlur = 25;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

/* INPUT */
addEventListener("mousemove", e => draw(e.clientX, e.clientY));
addEventListener("touchmove", e => draw(e.touches[0].clientX, e.touches[0].clientY));
addEventListener("mouseout", () => lastX = lastY = null);

/* PLYNULÉ MIZENÍ */
function fadeCanvas() {
  const elapsed = Date.now() - lastDrawTime;

  const fade = elapsed > 3000 ? 0.18 : 0.035;

  ctx.shadowBlur = 0;
  ctx.fillStyle = `rgba(0,0,0,${fade})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(fadeCanvas);
}

fadeCanvas();



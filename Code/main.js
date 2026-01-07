const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

ctx.globalCompositeOperation = "lighter";
let lastX = null;
let lastY = null;
let lastDrawTime = Date.now();

function draw(x, y) {
  lastDrawTime = Date.now();
  if (lastX === null) { lastX = x; lastY = y; return; }

  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.55)";
  ctx.lineWidth = 1.6;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(29,185,84,0.9)";
  ctx.shadowBlur = 10;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));
window.addEventListener("mouseout", () => { lastX = null; lastY = null; });

function fadeCanvas() {
  const elapsed = Date.now() - lastDrawTime;
  const fade = elapsed > 3000 ? 0.2 : 0.04;
  ctx.shadowBlur = 0;
  ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fadeCanvas);
}
fadeCanvas();

/* LOGIKA PRO SCROLLOVÁNÍ SEKCÍ DO STRAN */
const sections = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      // Tato část zajistí, že při scrollu pryč (nahoru i dolů) sekce zase odjede
      entry.target.classList.remove('is-visible');
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

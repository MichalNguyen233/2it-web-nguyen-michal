const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "lighter";

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

let lastX = null, lastY = null;

function draw(x, y) {
  if (lastX === null) {
    lastX = x;
    lastY = y;
    return;
  }
  ctx.strokeStyle = "rgba(29,185,84,0.25)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x;
  lastY = y;
}

addEventListener("mousemove", e => draw(e.clientX, e.clientY));
addEventListener("touchmove", e => draw(e.touches[0].clientX, e.touches[0].clientY));
addEventListener("mouseout", () => lastX = lastY = null);

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 40);

/* SCROLL PARALLAX */
const sections = document.querySelectorAll("section");

addEventListener("scroll", () => {
  const y = scrollY;
  sections.forEach((sec, i) => {
    const offset = i % 2 === 0 ? y * 0.04 : y * -0.04;
    sec.style.transform = `translateX(${offset}px)`;
  });
});


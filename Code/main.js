const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

ctx.globalCompositeOperation = "lighter";

let lastX = null, lastY = null, lastDrawTime = Date.now();

/* Neon čáry */
function draw(x, y) {
  lastDrawTime = Date.now();
  if(lastX === null){ lastX = x; lastY = y; return; }

  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.7)";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(29,185,84,1)";
  ctx.shadowBlur = 12;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.35)";
  ctx.lineWidth = 4;
  ctx.shadowBlur = 26;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}

window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));
window.addEventListener("touchmove", e => draw(e.touches[0].clientX, e.touches[0].clientY), {passive:true});
window.addEventListener("mouseout", () => { lastX=null; lastY=null; });

/* Fade-out neon čar */
function fadeCanvas(){
  const elapsed = Date.now() - lastDrawTime;
  ctx.globalCompositeOperation = "source-over";

  if(elapsed > 3000){
    ctx.fillStyle = "rgba(0,0,0,0.35)";
  } else {
    ctx.fillStyle = "rgba(0,0,0,0.04)";
  }

  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "lighter";
  requestAnimationFrame(fadeCanvas);
}
fadeCanvas();

/* Scroll parallax pro spodní sekce */
const scrollSections = [
  document.getElementById("skills"),
  document.getElementById("projects"),
  document.getElementById("contact")
];

/* Přidej bubliny do HTML dynamicky */
const bubbleLeft = document.createElement("div");
bubbleLeft.className = "bubble bubble-left";
document.body.appendChild(bubbleLeft);

const bubbleRight = document.createElement("div");
bubbleRight.className = "bubble bubble-right";
document.body.appendChild(bubbleRight);

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* Spodní sekce – každá mírně odlišný pohyb pro efekt dynamiky */
  scrollSections.forEach((sec, i) => {
    let offsetX = 0;
    let offsetY = scrollY * 0.06; // synchronní pohyb po Y
    if(i % 2 === 0) offsetX = scrollY * 0.03; // jedna mírně doprava
    else offsetX = -scrollY * 0.03; // druhá mírně doleva
    sec.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  /* Bubliny reagují na scroll – jedna zprava, druhá zleva */
  bubbleLeft.style.transform = `translate(${scrollY * 0.2}px, ${scrollY * 0.05}px)`;
  bubbleRight.style.transform = `translate(${-scrollY * 0.25}px, ${-scrollY * 0.1}px)`;
});

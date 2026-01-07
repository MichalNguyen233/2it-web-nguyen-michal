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

/* Scroll parallax */
const allSections = document.querySelectorAll("section");
/* Vyber spodní sekce – od #skills dolů */
const scrollSections = Array.from(allSections).filter(sec => 
  ["skills","projects","contact"].includes(sec.id)
);

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* Horní sekce mohou mít mírný pohyb (volitelné) */
  allSections.forEach((sec,i) => {
    if(!scrollSections.includes(sec)){
      const offset = i % 2 === 0 ? scrollY * 0.02 : scrollY * -0.02;
      sec.style.transform = `translateX(${offset}px)`;
    }
  });

  /* Spodní sekce – synchronizovaný pohyb */
  scrollSections.forEach(sec => {
    const offset = scrollY * 0.08; // stejný poměr pro všechny
    sec.style.transform = `translateY(${offset}px)`; // pohyb po Y
  });
});

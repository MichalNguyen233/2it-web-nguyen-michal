/** 1. KRESLENÍ NA CANVAS **/
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener("resize", resize); resize();

let lastX = null, lastY = null, lastTime = Date.now();
function draw(x, y) {
  lastTime = Date.now();
  if (lastX === null) { lastX = x; lastY = y; return; }
  ctx.beginPath();
  ctx.strokeStyle = "rgba(29, 185, 84, 0.6)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#1DB954";
  ctx.moveTo(lastX, lastY); ctx.lineTo(x, y); ctx.stroke();
  lastX = x; lastY = y;
}
window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));

function fade() {
  const isIdle = Date.now() - lastTime > 2000;
  ctx.fillStyle = `rgba(0, 0, 0, ${isIdle ? 0.15 : 0.04})`;
  ctx.shadowBlur = 0; ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fade);
}
fade();

/** 2. POHYB SEKCÍ + ANIMACE JMÉNA **/
const sections = document.querySelectorAll('section');
const heroName = document.getElementById('hero-name');
let angle = 0;

function update() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const centerOfScreen = scrollY + (vh / 2);

  // A) HOUPÁNÍ JMÉNA (pomocí funkce Sinus pro hladký pohyb)
  angle += 0.02; // Rychlost houpání
  const yOffset = Math.sin(angle) * 20; // Rozsah pohybu (20px nahoru a dolů)
  if (heroName) {
    heroName.style.transform = `translateY(${yOffset}px)`;
  }

  // B) POHYB SEKCÍ DO STRAN
  sections.forEach((section, index) => {
    if (section.id === 'hero') return; 

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionCenter = sectionTop + (sectionHeight / 2);
    const diff = centerOfScreen - sectionCenter;

    const sensitivity = 0.3; 
    const direction = index % 2 === 0 ? 1 : -1;
    
    section.style.transform = `translateX(${diff * sensitivity * direction}px)`;
    section.style.opacity = Math.max(1 - Math.abs(diff) / (vh * 1.2), 0.3);
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

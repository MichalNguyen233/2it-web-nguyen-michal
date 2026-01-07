/** 1. NEONOVÝ CANVAS EFEKT **/
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

ctx.globalCompositeOperation = "lighter";
let lastX = null, lastY = null, lastDrawTime = Date.now();

function draw(x, y) {
  lastDrawTime = Date.now();
  if (lastX === null) { lastX = x; lastY = y; return; }

  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.5)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(29,185,84,0.8)";
  ctx.shadowBlur = 12;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x; lastY = y;
}

window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));
window.addEventListener("mouseout", () => { lastX = null; lastY = null; });

function fadeCanvas() {
  const elapsed = Date.now() - lastDrawTime;
  const fade = elapsed > 2000 ? 0.15 : 0.03; 
  ctx.shadowBlur = 0;
  ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fadeCanvas);
}
fadeCanvas();


/** 2. DYNAMICKÝ POHYB SEKCÍ PODLE SCROLLU **/
const sections = document.querySelectorAll('section');

function updateSections() {
  const windowCenter = window.scrollY + (window.innerHeight / 2);

  sections.forEach((section, index) => {
    // Přeskočíme Hero sekci, aby zůstala víceméně v klidu
    if (section.id === 'hero') return;

    const sectionRect = section.getBoundingClientRect();
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionCenter = sectionTop + (sectionHeight / 2);

    // Vzdálenost středu sekce od aktuálního středu obrazovky
    const distance = windowCenter - sectionCenter;

    // Síla pohybu - uprav toto číslo pro větší/menší výkyv
    const intensity = 0.25; 
    
    // Střídání stran: sudé sekce zprava, liché zleva
    const direction = index % 2 === 0 ? 1 : -1;
    let moveX = (distance * intensity) * direction;

    // Omezení maximálního posunu (v pixelech)
    const maxMove = 180;
    moveX = Math.max(Math.min(moveX, maxMove), -maxMove);

    // Průhlednost - čím dál je od středu, tím je méně vidět
    const opacity = 1 - Math.abs(distance) / 1000;

    section.style.transform = `translateX(${moveX}px)`;
    section.style.opacity = Math.max(opacity, 0.4);
  });
}

// Naslouchání na scroll
window.addEventListener('scroll', updateSections);
// Spuštění po načtení pro nastavení úvodních pozic
window.addEventListener('load', updateSections);

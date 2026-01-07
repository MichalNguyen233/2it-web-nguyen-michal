/** 1. KRESLENÍ NA CANVAS **/
const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let lastX = null, lastY = null, lastTime = Date.now();

function draw(x, y) {
  lastTime = Date.now();
  if (lastX === null) { lastX = x; lastY = y; return; }
  ctx.beginPath();
  ctx.strokeStyle = "rgba(29,185,84,0.6)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.shadowBlur = 12;
  ctx.shadowColor = "#1DB954";
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x; lastY = y;
}

window.addEventListener("mousemove", e => draw(e.clientX, e.clientY));
window.addEventListener("mouseout", () => { lastX = null; lastY = null; });

function fade() {
  // Plynulé vytrácení čar
  const isIdle = Date.now() - lastTime > 2000;
  ctx.fillStyle = `rgba(0, 0, 0, ${isIdle ? 0.15 : 0.04})`;
  ctx.shadowBlur = 0;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fade);
}
fade();


/** 2. ULTRA-CITLIVÝ POHYB SEKCÍ (FIXNÍ SMYČKA) **/
const sections = document.querySelectorAll('section');

function scrollUpdate() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const centerOfScreen = scrollY + (vh / 2);

  sections.forEach((section, index) => {
    if (section.id === 'hero') return; // Hero neuhýbá

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionCenter = sectionTop + (sectionHeight / 2);

    // Vzdálenost středu sekce od středu obrazovky
    const diff = centerOfScreen - sectionCenter;

    // Citlivost (čím vyšší, tím rychleji sekce "létají")
    const sensitivity = 0.35;
    
    // Střídání stran
    const direction = index % 2 === 0 ? 1 : -1;
    const moveX = diff * sensitivity * direction;

    // Aplikace transformace bez jakékoliv prodlevy
    section.style.transform = `translateX(${moveX}px)`;
    
    // Volitelně: Průhlednost podle vzdálenosti
    const opacity = 1 - Math.abs(diff) / (vh * 1.2);
    section.style.opacity = Math.max(opacity, 0.3);
  });

  // Udržuje pohyb dokonale plynulý
  requestAnimationFrame(scrollUpdate);
}

// Spuštění nekonečné smyčky pro kontrolu scrollu
requestAnimationFrame(scrollUpdate);

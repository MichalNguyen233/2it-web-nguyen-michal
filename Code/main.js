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

/* KRESLENÍ NEON */
function draw(x,y){
  lastDrawTime = Date.now();
  if(lastX===null){ lastX=x; lastY=y; return; }

  // ostrá linka
  ctx.beginPath();
  ctx.strokeStyle="rgba(29,185,84,0.7)";
  ctx.lineWidth=1.5;
  ctx.lineCap="round";
  ctx.shadowColor="rgba(29,185,84,1)";
  ctx.shadowBlur=12;
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(x,y);
  ctx.stroke();

  // glow aura
  ctx.beginPath();
  ctx.strokeStyle="rgba(29,185,84,0.35)";
  ctx.lineWidth=4;
  ctx.shadowBlur=26;
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(x,y);
  ctx.stroke();

  lastX=x; lastY=y;
}

/* INPUT */
window.addEventListener("mousemove",e=>draw(e.clientX,e.clientY));
window.addEventListener("touchmove",e=>draw(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
window.addEventListener("mouseout",()=>{ lastX=null; lastY=null; });

/* PLYNULÉ A TVRDÉ MIZENÍ */
function fadeCanvas(){
  const elapsed = Date.now() - lastDrawTime;
  ctx.globalCompositeOperation="source-over";
  if(elapsed>3000){
    // po 3s rychle pryč
    ctx.fillStyle="rgba(0,0,0,0.35)";
  }else{
    // trail efekt
    ctx.fillStyle="rgba(0,0,0,0.04)";
  }
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation="lighter";

  requestAnimationFrame(fadeCanvas);
}
fadeCanvas();

/* SCROLL PARALLAX SEKCÍ */
const sections=document.querySelectorAll("section");
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  sections.forEach((sec,i)=>{
    const offset=i%2===0 ? y*0.04 : y*-0.04;
    sec.style.transform=`translateX(${offset}px)`;
  });
});



const intro = document.getElementById("letterIntro");
const giftLetter = document.getElementById("giftLetter");
const tapMessage = document.getElementById("tapMessage");
const tapSubMessage = document.getElementById("tapSubMessage");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const vampireLayer = document.getElementById("vampireLayer");
const particles = document.getElementById("particles");

let tapCount = 0;

function createGlowParticles(){
  const total = 55;

  for(let i=0;i<total;i++){
    const p = document.createElement("span");
    p.className = "glow-particle";
    p.style.left = Math.random()*100 + "%";
    p.style.top = (60 + Math.random()*50) + "%";
    p.style.animationDuration = (8 + Math.random()*13) + "s";
    p.style.animationDelay = (-Math.random()*16) + "s";
    p.style.setProperty("--drift", ((Math.random()-.5)*170) + "px");
    p.style.opacity = .25 + Math.random()*.6;
    const size = 2 + Math.random()*3;
    p.style.width = size + "px";
    p.style.height = size + "px";
    particles.appendChild(p);
  }
}
createGlowParticles();

function playMusic(){
  bgMusic.volume = 0.42;
  bgMusic.play().catch(()=>{});
}

function tapLetter(){
  if(tapCount >= 3) return;

  tapCount++;
  giftLetter.classList.add(`step-${tapCount}`);

  if(tapCount === 1){
    tapMessage.textContent = "The ribbon loosened";
    tapSubMessage.textContent = "One more little tap ♡";
  }

  if(tapCount === 2){
    tapMessage.textContent = "Almost there";
    tapSubMessage.textContent = "One last tap to open it";
  }

  if(tapCount === 3){
    tapMessage.textContent = "For you ♡";
    tapSubMessage.textContent = "Happy birthday";

    playMusic();
    vampireLayer.classList.add("active");

    setTimeout(()=>{
      intro.classList.add("opened");
      observeReveals();
    },900);
  }
}

giftLetter.addEventListener("click", tapLetter);

musicBtn.addEventListener("click",()=>{
  if(bgMusic.paused){
    playMusic();
    musicBtn.textContent = "♫";
  }else{
    bgMusic.pause();
    musicBtn.textContent = "♪";
  }
});

function observeReveals(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  },{threshold:.14});

  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}

observeReveals();

// Small cursor/touch sparkle effect
document.addEventListener("pointerdown",(e)=>{
  for(let i=0;i<5;i++){
    const s=document.createElement("span");
    s.className="glow-particle";
    s.style.position="fixed";
    s.style.left=e.clientX+(Math.random()*26-13)+"px";
    s.style.top=e.clientY+(Math.random()*26-13)+"px";
    s.style.zIndex=80;
    s.style.animationDuration=".8s";
    s.style.setProperty("--drift",(Math.random()*60-30)+"px");
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),900);
  }
});

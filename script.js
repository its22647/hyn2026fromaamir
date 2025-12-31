const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const launchBtn = document.getElementById('launchBtn');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let flashTexts = [];
let celebrationIntensity = 0.025; 

class Particle {
  constructor(x, y, color, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * (speed * 0.7),
      y: (Math.random() - 0.5) * (speed * 0.7)
    };
    this.alpha = 1;
    this.decay = Math.random() * 0.01 + 0.005; 
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.velocity.y += 0.035; 
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
  }
}

function createFirework(isHeavy) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * (canvas.height * 0.55);
  // Rich professional colors
  const colors = ['#0077be', '#c5a059', '#a51c30', '#4b0082', '#006400', '#ffffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const count = isHeavy ? 85 : 25; 
  const speed = isHeavy ? 7 : 3.5; 
  
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, color, speed));
  }

  // Background 2026: Minimal White Color & Very low quantity
  if (isHeavy && Math.random() > 0.92) { // 92% filter for very rare appearance
    flashTexts.push({
        x: x - 45,
        y: y,
        alpha: 1.0,
        color: 'rgba(255, 255, 255, 0.7)', // Minimal White
        speedFactor: 0.005 
    });
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    if (p.alpha > 0) {
      p.update();
      p.draw();
    } else {
      particles.splice(i, 1);
    }
  });

  // Render Background 2026
  ctx.font = "bold 32px Orbitron";
  flashTexts.forEach((ft, i) => {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.fillStyle = ft.color;
      ctx.fillText("2026", ft.x, ft.y);
      ctx.restore();
      ft.alpha -= ft.speedFactor; 
      if (ft.alpha <= 0) flashTexts.splice(i, 1);
  });

  if (Math.random() < celebrationIntensity) {
    createFirework(celebrationIntensity > 0.05);
  }

  requestAnimationFrame(animate);
}

launchBtn.onclick = () => {
  screen1.classList.remove('active');
  screen2.classList.add('active');
  celebrationIntensity = 0.22; 
};

function resetSystem() {
  celebrationIntensity = 0.025;
  flashTexts = [];
  screen2.classList.remove('active');
  screen1.classList.add('active');
}

animate();

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
// ========================================
// 深海歌姫 VTuber テンプレート
// The Firmament
// ========================================

// ===== 深海Canvas =====
const canvas = document.getElementById('ocean');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

// 深海グラデーション背景
function drawOceanBg() {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0,    'rgba(10, 58, 92, 0.25)');   // 水面（明るい）
    grad.addColorStop(0.2,  'rgba(5, 30, 60, 0.35)');
    grad.addColorStop(0.5,  'rgba(3, 15, 35, 0.45)');
    grad.addColorStop(0.8,  'rgba(2, 8, 20, 0.55)');
    grad.addColorStop(1,    'rgba(1, 3, 10, 0.7)');      // 深淵（暗い）
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 気泡クラス
class Bubble {
    constructor() { this.reset(true); }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
        this.r = Math.random() * 8 + 2;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.sway   = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.008;
        this.wobble = Math.random() * 0.3 + 0.7; // 楕円係数
    }

    update() {
        this.sway += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.sway) * 0.6;
        this.y -= this.speedY;
        if (this.y < -20) this.reset();
    }

    draw() {
        // 深度による透明度（上のほうが明るい）
        const depthFactor = this.y / canvas.height;
        const alpha = this.opacity * (1 - depthFactor * 0.5);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r * this.wobble, 0, 0, Math.PI * 2);

        // 気泡のグラデーション
        const grad = ctx.createRadialGradient(
            this.x - this.r * 0.3, this.y - this.r * 0.3, 0,
            this.x, this.y, this.r
        );
        grad.addColorStop(0, `rgba(168, 216, 234, ${alpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(0, 229, 255, ${alpha * 0.1})`);
        grad.addColorStop(1, `rgba(0, 229, 255, ${alpha * 0.3})`);

        ctx.fillStyle = grad;
        ctx.fill();

        // 縁取り
        ctx.strokeStyle = `rgba(168, 216, 234, ${alpha * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
    }
}

// 発光粒子（プランクトン）
class Plankton {
    constructor() { this.reset(true); }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial
            ? canvas.height * 0.4 + Math.random() * canvas.height * 0.6
            : canvas.height + 10;
        this.r = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.speedY = Math.random() * 0.3 + 0.05;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.pulse  = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.04 + 0.02;
    }

    update() {
        this.pulse += this.pulseSpeed;
        this.x += this.speedX;
        this.y -= this.speedY;
        if (this.y < canvas.height * 0.3) this.reset();
    }

    draw() {
        const glow = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3);
        grad.addColorStop(0, `rgba(0, 229, 255, ${glow})`);
        grad.addColorStop(1, `rgba(0, 229, 255, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
    }
}

// 水面の揺れる光
function drawCaustics(t) {
    ctx.save();
    for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 8) * i + Math.sin(t * 0.001 + i) * 30;
        const grad = ctx.createLinearGradient(x, 0, x + 40, canvas.height * 0.5);
        grad.addColorStop(0, `rgba(168, 216, 234, 0.03)`);
        grad.addColorStop(1, `rgba(168, 216, 234, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, 40 + Math.sin(t * 0.002 + i * 0.5) * 20, canvas.height * 0.5);
    }
    ctx.restore();
}

const bubbles  = Array.from({ length: 60 }, () => new Bubble());
const plankton = Array.from({ length: 80 }, () => new Plankton());
let t = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOceanBg();
    drawCaustics(t);
    plankton.forEach(p => { p.update(); p.draw(); });
    bubbles.forEach(b  => { b.update(); b.draw(); });
    t++;
    requestAnimationFrame(animate);
}
animate();

// ===== スクロール深度インジケーター =====
const depthNum = document.getElementById('depthNum');
window.addEventListener('scroll', () => {
    const maxDepth = document.body.scrollHeight - window.innerHeight;
    const depth = Math.round((window.scrollY / maxDepth) * 6000);
    if (depthNum) depthNum.textContent = depth + 'm';
});

// ===== ナビゲーション =====
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans  = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ===== スムーススクロール =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

// ===== フェードイン =====
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('section, .scard, .gitem, .gcard, .about-portrait, .about-text')
    .forEach(el => { el.classList.add('fade-in'); obs.observe(el); });

// ===== リマインダーボタン（トグル式） =====
document.querySelectorAll('.scard-btn.ghost').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const isSet = btn.dataset.set === 'true';
        if (isSet) {
            btn.textContent = 'リマインダー設定';
            btn.style.borderColor = '';
            btn.style.color = '';
            btn.dataset.set = 'false';
        } else {
            btn.textContent = '🌊 設定済み（解除する）';
            btn.style.borderColor = 'rgba(0, 229, 255, 0.35)';
            btn.style.color = 'var(--glow)';
            btn.dataset.set = 'true';
        }
    });
});

// ===== フォーム送信 =====
function handleSubmit(e) {
    e.preventDefault();
    alert('メッセージが深海に届きました 🌊\n必ずお返事いたします。');
    e.target.reset();
}

// ===== ギャラリー =====
document.querySelectorAll('.gitem').forEach(item => {
    item.addEventListener('click', () => {
        alert('ギャラリーを開きます\n（実際のサイトでは画像モーダルが表示されます）');
    });
});

console.log('🌊 Template by The Firmament — https://showstopper-mainengine.com/');

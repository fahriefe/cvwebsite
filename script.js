// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
});

// Cursor glow + card spotlight
const glow = document.querySelector('.glow');
window.addEventListener('pointermove', (e) => {
    glow.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
});
document.querySelectorAll('.card').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
});

// Scroll progress + active nav link
const bar = document.querySelector('.progress');
const links = [...document.querySelectorAll('.links a')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
function onScroll() {
    const h = document.documentElement;
    bar.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
    const y = h.scrollTop + 140;
    sections.forEach((s, i) => links[i].classList.toggle('active', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.shot img').forEach((img) => {
    img.parentElement.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
    });
});
const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
lb.addEventListener('click', closeLb);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

document.getElementById('year').textContent = new Date().getFullYear();

// Email is assembled at runtime so scrapers do not find it in the HTML
const mail = document.getElementById("mail");
if (mail) {
    const addr = mail.dataset.u + "@" + mail.dataset.d;
    mail.href = "mailto:" + addr;
    mail.querySelector("span").textContent = addr;
}

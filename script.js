// ========================
// 1. DARK / LIGHT MODE TOGGLE
// ========================
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
} else if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
} else {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// ========================
// 2. MOBILE MENU TOGGLE
// ========================
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ========================
// 3. SMOOTH SCROLL + AKTIFKAN LINK
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
            updateActiveLink(targetId);
        }
    });
});

function updateActiveLink(currentHash) {
    const sections = document.querySelectorAll('section');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    if (!current && window.scrollY < 100) current = 'home';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    updateActiveLink();
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.backdropFilter = 'blur(0px)';
    } else {
        navbar.style.background = 'var(--bg-primary)';
    }
});

// ========================
// 4. INTERSECTION OBSERVER (Fade In)
// ========================
const fadeElements = document.querySelectorAll('section, .project-card, .skill-card, .about-content, .contact-wrapper');
fadeElements.forEach(el => {
    el.classList.add('fade-section');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

fadeElements.forEach(el => {
    observer.observe(el);
});

// ========================
// 5. FORM KIRIM KE EMAIL (FormSubmit)
// ========================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Tampilkan loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        formStatus.innerHTML = '';
        
        // Ganti dengan email tujuan Anda
        const YOUR_EMAIL = 'garin.rpl.a@gmail.com';
        
        // Ambil data form
        const formData = new FormData(contactForm);
        formData.append('_captcha', 'false');  // Matikan captcha (opsional)
        formData.append('_subject', 'Pesan Baru dari Portofolio');
        
        try {
            const response = await fetch(`https://formsubmit.co/${YOUR_EMAIL}`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                formStatus.innerHTML = '<span style="color: #10b981;">✓ Pesan berhasil dikirim! Saya akan membalas segera.</span>';
                contactForm.reset();
            } else {
                throw new Error('Gagal mengirim');
            }
        } catch (error) {
            formStatus.innerHTML = '<span style="color: #ef4444;">✗ Gagal mengirim pesan. Silakan coba lagi nanti.</span>';
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            // Hilangkan status setelah 5 detik
            setTimeout(() => {
                if (formStatus.innerHTML) formStatus.innerHTML = '';
            }, 5000);
        }
    });
}

// ========================
// 6. INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    const hero = document.querySelector('#home');
    if(hero) hero.classList.add('visible');
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

console.log("%c✨ Portofolio Fresh Graduate | Mode Gelap/Terang Siap! | Form terhubung ke email", "color: #3b82f6; font-size: 14px;");

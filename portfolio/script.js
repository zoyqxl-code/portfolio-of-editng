document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll & Navbar Effects ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(44, 30, 22, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(44, 30, 22, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });


    // --- Video Performance ---
    const videos = document.querySelectorAll('video');
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.paused && entry.target.autoplay) {
                        entry.target.play().catch(e => console.log('Autoplay prevented', e));
                    }
                } else {
                    if (!entry.target.paused && entry.target.autoplay) {
                        entry.target.pause();
                    }
                }
            });
        }, { threshold: 0.1 });
        videos.forEach(video => videoObserver.observe(video));
    }

    // --- 3D Tilt Effect for About Image ---
    const card = document.querySelector('.tilt-card');
    const wrapper = document.querySelector('.about-image-wrapper');

    if (card && wrapper) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Get rotation values (max 20 degrees)
            const rotateX = ((y - centerY) / centerY) * -15; // Invert axis for natural feel
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }

    // --- Button Ripple Effect ---
    const rippleButtons = document.querySelectorAll('.cta-button, .download-button, .contact-item');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;

            const rect = btn.getBoundingClientRect();

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const existingRipple = btn.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove(); // Clean up previous ripple for sharper feel
            }

            btn.appendChild(circle);

            // Clean up after animation
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-wrapper');

    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.8)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);

        setTimeout(() => {
            heroImage.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 600);
    }

    const typingElement = document.querySelector('.typing-text');
    const textToType = "A Bachelor’s degree graduate in Computer Science.";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(() => {
        if (typingElement) {
            typeWriter();
        }
    }, 1500);

    function smoothScrollTo(targetSelector, duration) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        const pageData = {
            about_p1: "Saya adalah lulusan Ilmu Komputer dengan antusiasme yang kuat terhadap jaringan komputer dan teknologi modern. Dengan latar belakang pendidikan di bidang Ilmu Komputer, saya fokus menciptakan solusi sistem jaringan yang stabil, aman, efisien, dan andal.",
            about_p2: "Saya percaya bahwa kombinasi logika teknis dan kemampuan pemecahan masalah adalah kunci untuk membangun infrastruktur jaringan yang berkualitas. Saat ini, saya terus mengasah keterampilan saya dalam jaringan, troubleshooting, dan sistem IT untuk menjadi profesional IT yang kompeten.",
            about_edu_label: "Pendidikan",
            about_edu_name: "UNIVERSITAS KRISTEN INDONESIA MALUKU",
            about_loc_label: "Lokasi",
            about_loc_name: "Ambon, Maluku Indonesia",
            skills_title: "KEAHLIAN & <span>ALAT</span>"
        };

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 60;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo({ top: run, behavior: 'auto' });
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const closeMenu = document.querySelector('.close-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    }

    document.querySelectorAll('.nav-links a, .scroll-indicator a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(targetId, 2000);

                setTimeout(() => {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) targetElement.classList.add("active");
                }, 1500);
            }
        });
    });

    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - 150) {
                reveals[i].classList.add("active");
                const aboutText = reveals[i].querySelector('.about-text');
                const aboutImage = reveals[i].querySelector('.about-image');
                if (aboutText) aboutText.classList.add("active");
                if (aboutImage) aboutImage.classList.add("active");
            } else {
                reveals[i].classList.remove("active");
                const aboutText = reveals[i].querySelector('.about-text');
                const aboutImage = reveals[i].querySelector('.about-image');
                if (aboutText) aboutText.classList.remove("active");
                if (aboutImage) aboutImage.classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    reveal();

    const orgList = document.getElementById('org-typing-list');
    if (orgList) {
        const orgTexts = [
            "Responsible for high-quality visual documentation of all faculty events.",
            "Managed and designed creative content for social media.",
            "Concepted and executed visual decorations for student activities."
        ];
        let orgTypeIndex = 0;
        let orgCharIndex = 0;
        let hasOrgTyped = false;

        function typeOrgText() {
            if (orgTypeIndex >= orgTexts.length) {
                const lastCursor = document.querySelector('.typing-cursor');
                if (lastCursor) lastCursor.style.display = 'none';
                return;
            }

            const currentText = orgTexts[orgTypeIndex];

            let currentLi = orgList.children[orgTypeIndex];
            if (!currentLi) {
                currentLi = document.createElement('li');
                orgList.appendChild(currentLi);
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'typing-cursor';
                currentLi.appendChild(cursorSpan);
            }

            const cursor = currentLi.querySelector('.typing-cursor');

            if (orgCharIndex < currentText.length) {
                const char = document.createTextNode(currentText.charAt(orgCharIndex));
                currentLi.insertBefore(char, cursor);
                orgCharIndex++;
                setTimeout(typeOrgText, 50);
            } else {
                cursor.style.display = 'none';

                orgTypeIndex++;
                orgCharIndex = 0;
                setTimeout(typeOrgText, 500);
            }
        }

        const orgSection = document.getElementById('organization');

        function checkOrgVisibility() {
            if (!orgSection || hasOrgTyped) return;

            const rect = orgSection.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

            if (rect.top <= viewHeight * 0.75) {
                hasOrgTyped = true;
                typeOrgText();
            }
        }

        window.addEventListener('scroll', checkOrgVisibility);
        checkOrgVisibility();
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }

    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            body.setAttribute('data-theme', theme);
            // Sync active state on ALL buttons
            themeBtns.forEach(b => {
                if (b.getAttribute('data-theme') === theme) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        });
    });

    if (themeBtns.length > 0) {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme) {
            // Sync all buttons to current theme
            themeBtns.forEach(b => {
                if (b.getAttribute('data-theme') === currentTheme) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        }
    }
});

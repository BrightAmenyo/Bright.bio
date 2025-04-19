// Add active class to nav items when scrolling
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    let menuOpen = false;
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
            menuOpen = !menuOpen;
        });

        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('open');
                menuOpen = false;
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                menuBtn.classList.remove('open');
                navMenu.classList.remove('open');
                menuOpen = false;
            }
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 60;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio filtering with animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.opacity = '0';
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Add touch feedback for mobile
    const buttons = document.querySelectorAll('button, .btn, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.7';
        });
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        });
    });

    // Awards navigation
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.querySelector('.awards-list');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const cardWidth = 300; // Width of each card including gap

        if (container && prevBtn && nextBtn) {
            // Update button visibility
            function updateButtons() {
                prevBtn.style.display = container.scrollLeft <= 0 ? 'none' : 'flex';
                nextBtn.style.display = 
                    container.scrollLeft >= container.scrollWidth - container.clientWidth - 10 
                    ? 'none' : 'flex';
            }

            // Initial button state
            updateButtons();

            // Scroll handlers
            prevBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            });

            // Update buttons on scroll
            container.addEventListener('scroll', updateButtons);

            // Touch swipe support
            let touchStart = null;
            let touchEnd = null;

            container.addEventListener('touchstart', (e) => {
                touchStart = e.touches[0].clientX;
            });

            container.addEventListener('touchmove', (e) => {
                if (!touchStart) return;
                touchEnd = e.touches[0].clientX;
            });

            container.addEventListener('touchend', () => {
                if (!touchStart || !touchEnd) return;
                
                const distance = touchStart - touchEnd;
                const minSwipeDistance = 50;

                if (Math.abs(distance) > minSwipeDistance) {
                    if (distance > 0) {
                        // Swipe left, go next
                        container.scrollBy({
                            left: cardWidth,
                            behavior: 'smooth'
                        });
                    } else {
                        // Swipe right, go prev
                        container.scrollBy({
                            left: -cardWidth,
                            behavior: 'smooth'
                        });
                    }
                }

                touchStart = null;
                touchEnd = null;
            });

            // Handle window resize
            window.addEventListener('resize', updateButtons);
        }
    });

    // Scroll spy functionality
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

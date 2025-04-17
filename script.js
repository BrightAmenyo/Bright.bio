// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.fa-bars');
    const menu = document.querySelector('#sidemenu');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        menu.classList.toggle('show');
        menuBtn.classList.toggle('fa-bars');
        menuBtn.classList.toggle('fa-times');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Active menu item highlighting
    const sections = document.querySelectorAll('section[id]:not(#Books)');  // Exclude Books section
    const navLinks = document.querySelectorAll('nav ul li a');

    const highlightActiveSection = () => {
        const scrollPos = window.scrollY + 100; // Offset for nav height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial check

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
});

// Section Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Show all sections by default
    const sections = ['header', 'about', 'experience', 'portfolio', 'Books', 'contact'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'block';
        }
    });

    // Handle navigation clicks
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            
            // Smooth scroll to section
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
});

// Awards Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize awards auto-scroll
    const awardsList = document.querySelector('.awards-list');
    const cards = document.querySelectorAll('.award-card');
    let currentIndex = 0;
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            const scrollAmount = currentIndex * (350 + 32); // card width + gap
            
            awardsList.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 10000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }

    // Manual scroll buttons
    window.scrollAwards = function(direction) {
        stopAutoScroll(); // Stop auto-scroll when manually scrolling
        const scrollAmount = direction === 'left' ? -350 : 350;
        awardsList.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(startAutoScroll, 15000); // Resume auto-scroll after 15 seconds
    };

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    awardsList.addEventListener('mouseenter', stopAutoScroll);
    
    // Resume on mouse leave
    awardsList.addEventListener('mouseleave', startAutoScroll);

    // Stop when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });
});

// Pause when tab is not visible
document.addEventListener('visibilitychange', () => {
    // No action needed
});

// Smooth scroll navigation and section highlighting
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if(link.id !== 'commonsNavlink') {
            e.preventDefault();
            }
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation highlighting based on scroll position
    function highlightNavigation() {
        const scrollPos = window.scrollY + nav.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll event listener
    let ticking = false;
    function updateNavigation() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateNavigation);
    
    // Initial call to set active navigation on page load
    highlightNavigation();
    
    // Navbar background opacity based on scroll
    function updateNavOpacity() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrollY > heroHeight * 0.5) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(15px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateNavOpacity);
    
    // Mobile menu toggle (if needed in future)
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinksContainer = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinksContainer) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinksContainer.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }
    
    initMobileMenu();
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--bitcoin-orange);
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--bitcoin-orange);
    }
    
    .nav-links a {
        position: relative;
    }
`;
document.head.appendChild(style);









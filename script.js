document.addEventListener('DOMContentLoaded', () => {
    // Mo
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    const loginModal = document.getElementById('loginModal');
    const reservationModal = document.getElementById('reservationModal');
    const contactModal = document.getElementById('contactModal');

    const loginBtn = document.getElementById('loginBtn');
    const openReservationModal = document.getElementById('openReservationModal');
    const openContactModal = document.getElementById('openContactModal');

    const closeButtons = document.querySelectorAll('.modal .close');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    }
    if (openReservationModal && reservationModal) {
        openReservationModal.addEventListener('click', () => reservationModal.classList.add('active'));
    }
    if (openContactModal && contactModal) {
        openContactModal.addEventListener('click', () => contactModal.classList.add('active'));
    }

    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.querySelector('.cart-close');

    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', () => cartSidebar.classList.add('active'));
    }
    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', () => cartSidebar.classList.remove('active'));
    }


    const favoriteButtons = document.querySelectorAll('.favourite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('favorited');
            const icon = btn.querySelector('i');
            if (icon) {
                if (btn.classList.contains('favorited')) {
                    icon.style.color = 'red';
                } else {
                    icon.style.color = '';
                }
            }
        });
    });


    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));
});
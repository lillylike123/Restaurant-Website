        let cart = [];
        let cartTotal = 0;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotalElement = document.getElementById('cartTotal');
            
            cartCount.textContent = cart.length;
            cartTotalElement.textContent = cartTotal.toFixed(2);
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                `).join('');
            }
        }

        function addToCart(name, price, image) {
            cart.push({ name, price: parseFloat(price), image });
            cartTotal += parseFloat(price);
            updateCartUI();
        }

        function updateFavoritesUI() {
            document.querySelectorAll('.favorite-btn').forEach(btn => {
                const name = btn.getAttribute('data-name');
                if (favorites.includes(name)) {
                    btn.classList.add('favorited');
                } else {
                    btn.classList.remove('favorited');
                }
            });
            document.getElementById('favoritesIcon').style.color = favorites.length > 0 ? 'red' : '#666';
        }

        function toggleFavorite(name) {
            if (favorites.includes(name)) {
                favorites = favorites.filter(item => item !== name);
                alert(`${name} removed from favorites!`);
            } else {
                favorites.push(name);
                alert(`${name} added to favorites!`);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesUI();
        }

        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(253, 248, 240, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(253, 248, 240, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });

        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.add('active');
            modal.querySelector('.modal-content').focus();
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('active');
        }


        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const loginForm = document.getElementById('loginForm');

        loginBtn.addEventListener('click', function() {
            openModal('loginModal');
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert(`Login successful! Welcome ${email}`);
            closeModal('loginModal');
            loginBtn.textContent = 'Welcome!';
            loginBtn.style.background = '#27ae60';
        });

        const openReservationModal = document.getElementById('openReservationModal');
        const reservationModal = document.getElementById('reservationModal');
        const reservationForm = document.getElementById('reservationForm');

        openReservationModal.addEventListener('click', function() {
            openModal('reservationModal');
        });

        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Reservation request sent! We will contact you shortly to confirm your booking.');
            this.reset();
            closeModal('reservationModal');
        });

        const openContactModal = document.getElementById('openContactModal');
        const contactModal = document.getElementById('contactModal');
        const contactForm = document.getElementById('contactForm');

        openContactModal.addEventListener('click', function() {
            openModal('contactModal');
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            closeModal('contactModal');
        });

        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal.id);
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal('loginModal');
                closeModal('reservationModal');
                closeModal('contactModal');
                cartSidebar.classList.remove('active');
            }
        });

        const cartIcon = document.getElementById('cartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartClose = document.querySelector('.cart-close');

        cartIcon.addEventListener('click', function() {
            cartSidebar.classList.toggle('active');
        });

        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });

  
        document.querySelectorAll('.add-to-cart-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');
                const image = this.getAttribute('data-image');
                
                addToCart(name, price, image);
                
                this.classList.add('added');
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                
                setTimeout(() => {
                    this.classList.remove('added');
                    this.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
                }, 2000);
            });
        });

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                toggleFavorite(name);
            });
        });

        document.getElementById('favoritesIcon').addEventListener('click', function() {
            if (favorites.length === 0) {
                alert('No favorites added yet!');
            } else {
                alert(`Your favorites: ${favorites.join(', ')}`);
            }
        });

        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert(`Proceeding to checkout... Total: $${cartTotal.toFixed(2)}`);
            cart = [];
            cartTotal = 0;
            updateCartUI();
            cartSidebar.classList.remove('active');
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(function(el) {
            observer.observe(el);
        });

        document.querySelector('.fa-search').addEventListener('click', function() {
            const searchTerm = prompt('What would you like to search for?');
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}\nResults will appear here in a full implementation.`);
            }
        });

        const dishContainer = document.getElementById('dishes-container');
        const dishCards = document.querySelectorAll('.dish-card');
        const prevBtn = document.getElementById('prev-dish');
        const nextBtn = document.getElementById('next-dish');
        const cardWidth = dishCards[0].offsetWidth + 32;
        let currentIndex = 0;

        function updateCarousel() {
            dishContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', function() {
            if (currentIndex < dishCards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Initialize
        updateCartUI();
        updateFavoritesUI();

        // Loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            setTimeout(function() {
                document.querySelectorAll('.fade-in').forEach(function(el) {
                    el.classList.add('visible');
                });
            }, 300);
        });
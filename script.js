document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Star Background
    function createStars() {
        const starsContainer = document.getElementById('starsContainer');
        const count = 200;
        const maxDepth = 5;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size and depth
            const depth = Math.floor(Math.random() * maxDepth) + 1;
            const size = 0.5 + Math.random() * 2;
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--delay', `${delay}s`);
            
            // Set depth (z-index) properties
            star.style.transform = `translateZ(${depth}px)`;
            star.style.opacity = 0.2 + (depth / maxDepth) * 0.8;
            
            starsContainer.appendChild(star);
        }
    }

    createStars();

    // Parallax effect for stars on scroll
    window.addEventListener('scroll', function() {
        const stars = document.querySelectorAll('.star');
        const scrollPosition = window.scrollY;
        
        stars.forEach(star => {
            const depth = parseFloat(star.style.transform.replace('translateZ(', '').replace('px)', '')) || 1;
            const movement = scrollPosition * (depth / 5);
            star.style.transform = `translate3d(0, ${movement}px, ${depth}px)`;
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Notification function
    function showNotification(message, iconClass) {
        const notification = document.getElementById('notification');
        notification.innerHTML = `<i class="${iconClass}"></i> ${message}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Product image hover effect
    const productImage = document.querySelector('.product-image img');
    productImage.addEventListener('mouseenter', () => {
        productImage.style.transform = 'scale(1.05)';
    });
    productImage.addEventListener('mouseleave', () => {
        productImage.style.transform = 'scale(1)';
    });

    // Button click effects
    const buyNowBtn = document.getElementById('buyNowBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');

    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '#order';
    });

    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Voyager added to your cart!', 'fas fa-shopping-cart');
        
        // Cart icon animation
        const cartIcon = addToCartBtn.querySelector('i');
        cartIcon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    });

    // Space Facts
    const spaceFacts = [
        {
            title: "Voyager 1 Is Still Calling Home from Deep Space",
            text: "Despite being launched in 1977, Voyager 1 is still transmitting data from over 15 billion miles away, making it the farthest human-made object from Earth!",
            icon: "fas fa-rocket"
        },
        {
            title: "The Golden Record Will Outlive Humanity",
            text: "The Golden Record is made of gold-plated copper and designed to last over a billion years in space—longer than any civilization on Earth!",
            icon: "fas fa-atom"
        },
        {
            title: "It Contains a Cosmic Map Leading to Earth",
            text: "Engraved on the Golden Record is a pulsar map, which shows Earth's location in the galaxy—just in case an alien civilization finds it!",
            icon: "fas fa-snowflake"
        },
        {
            title: "The Golden Record Almost Had The Beatles!",
            text: "NASA wanted to include (Here Comes the Sun) by The Beatles, but record label disputes prevented it from being added.",
            icon: "fas fa-satellite"
        },
        {
            title: "It Carries the Sound of a Human Kiss",
            text: "Among the 116 images and sounds on the record, there's a recording of a human kiss—a small but profound message of love.",
            icon: "fas fa-shield-alt"
        },
        {
            title: " NASA Hacked It to Keep It Alive",
            text: "Voyager 1 wasn't designed to last this long. NASA engineers have reprogrammed it remotely multiple times, even using tricks that weren't originally planned to keep it running!",
            icon: "fas fa-compass"
        }
    ];

    const factTitle = document.getElementById('fact-title');
    const factText = document.getElementById('fact-text');
    const factIcon = document.querySelector('.fact-icon');
    const newFactBtn = document.getElementById('newFactBtn');

    function showRandomFact() {
        const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
        factTitle.textContent = randomFact.title;
        factText.textContent = randomFact.text;
        factIcon.innerHTML = `<i class="${randomFact.icon}"></i>`;
    }

    newFactBtn.addEventListener('click', showRandomFact);

    // Show initial fact
    showRandomFact();

    // Order form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const model = document.getElementById('model').value;
        const notes = document.getElementById('notes').value;
        
        // Create email body
        const subject = `New Order for Voyager: ${model}`;
        const body = `
            New Order Details:
            -----------------
            Name: ${name}
            Email: ${email}
            Address: ${address}
            Model: ${model}
            Special Requirements: ${notes || 'None'}
        `;
        
        // Send email using mailto link
        const mailtoLink = `mailto:ayush99know@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        // Show confirmation
        showNotification('Order details opened in your email client. Please send to complete your order.', 'fas fa-paper-plane');
        orderForm.reset();
    });

    // Gallery Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-description');
    const closeBtn = document.querySelector('.close-btn');
    
    document.querySelectorAll('.view-more-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const galleryItem = btn.closest('.gallery-item');
            const imgSrc = galleryItem.querySelector('img').src;
            const title = galleryItem.querySelector('h3').textContent;
            const desc = galleryItem.querySelector('p').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
            
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Enhanced 3D effect for gallery items on mouse move
    document.querySelector('.space-gallery').addEventListener('mousemove', (e) => {
        const galleryItems = document.querySelectorAll('.gallery-item-inner');
        const containerRect = e.currentTarget.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;
        
        galleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const itemCenterY = itemRect.top + itemRect.height / 2;
            
            // Calculate distance from mouse to item center
            const deltaX = e.clientX - itemCenterX;
            const deltaY = e.clientY - itemCenterY;
            
            // Calculate rotation based on distance
            const rotateY = deltaX / 20;
            const rotateX = -deltaY / 20;
            
            // Calculate scale based on distance from container center
            const distanceFromCenter = Math.sqrt(
                Math.pow(itemCenterX - centerX, 2) + 
                Math.pow(itemCenterY - centerY, 2)
            );
            const maxDistance = Math.sqrt(
                Math.pow(containerRect.width / 2, 2) + 
                Math.pow(containerRect.height / 2, 2)
            );
            const scale = 1 + (0.05 * (1 - distanceFromCenter / maxDistance));
            
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        });
    });
    
    // Reset transform when mouse leaves gallery
    document.querySelector('.space-gallery').addEventListener('mouseleave', () => {
        const galleryItems = document.querySelectorAll('.gallery-item-inner');
        galleryItems.forEach(item => {
            item.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Product Image Lightbox Functionality
    const productLightbox = document.getElementById('productLightbox');
    const productCloseBtn = document.getElementById('productCloseBtn');
    const productSlider = document.getElementById('productSlider');
    const productPrevBtn = document.getElementById('productPrevBtn');
    const productNextBtn = document.getElementById('productNextBtn');
    const productIndicators = document.getElementById('productIndicators');
    
    // Product images data - using your local images
    const productImages = [
        {
            src: 'image/product.jpg',
            title: 'Sound of Earth - Front View',
            description: 'The sleek plastic body with a stunning golden disk design'
        },
        {
            src: 'image/product2.jpg',
            title: 'Image 1',
            description: ''
        },
        {
            src: 'image/product3.jpg',
            title: 'Image 2',
            description: ''
        },
        {
            src: 'image/product4.jpg',
            title: 'Image 3',
            description: ''
        },
        {
            src: 'image/product5.jpg',
            title: 'Image 4',
            description: ''
        },
        {
            src: 'image/product6.jpg',
            title: 'Image 5',
            description: ''
        }
    ];
    
    let currentSlide = 0;
    
    // Initialize product lightbox slides
    function initProductLightbox() {
        productSlider.innerHTML = '';
        productIndicators.innerHTML = '';
        
        productImages.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'product-lightbox-slide';
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.title}" class="product-lightbox-image">
                <div class="product-lightbox-caption">
                    <h3 class="product-lightbox-title">${image.title}</h3>
                    <p class="product-lightbox-description">${image.description}</p>
                </div>
            `;
            productSlider.appendChild(slide);
            
            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = 'product-lightbox-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            productIndicators.appendChild(indicator);
        });
        
        updateSliderPosition();
    }
    
    // Open product lightbox
    document.getElementById('productImage').addEventListener('click', () => {
        initProductLightbox();
        productLightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close product lightbox
    productCloseBtn.addEventListener('click', () => {
        productLightbox.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close when clicking outside content
    productLightbox.addEventListener('click', (e) => {
        if (e.target === productLightbox) {
            productLightbox.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (productLightbox.classList.contains('show')) {
            if (e.key === 'Escape') {
                productLightbox.classList.remove('show');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
    
    // Navigation buttons
    productPrevBtn.addEventListener('click', prevSlide);
    productNextBtn.addEventListener('click', nextSlide);
    
    // Slide functions
    function goToSlide(index) {
        currentSlide = index;
        updateSliderPosition();
        updateIndicators();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + productImages.length) % productImages.length;
        updateSliderPosition();
        updateIndicators();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % productImages.length;
        updateSliderPosition();
        updateIndicators();
    }
    
    function updateSliderPosition() {
        productSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.product-lightbox-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Swipe functionality for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    productSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    productSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }

    // Enhanced Space Game Implementation
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameScore = document.getElementById('gameScore');
    const gameOverlay = document.getElementById('gameOverlay');
    const startBtn = document.getElementById('startBtn');
    const finalScore = document.querySelector('.final-score');

    // Game elements
    const ship = {
        x: canvas.width / 2,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        speed: 5,
        isAlive: true
    };

    const lasers = [];
    const aliens = [];
    const asteroids = [];
    let score = 0;
    let gameRunning = false;
    let keys = {};
    let animationId;
    let lastAlienSpawn = 0;
    let lastAsteroidSpawn = 0;
    let gameTime = 0;
    let difficulty = 1;

    // Load images
    const shipImg = new Image();
    shipImg.src = 'https://www.freeiconspng.com/uploads/spaceship-png-2.png';

    const alienImg = new Image();
    alienImg.src = 'https://www.freeiconspng.com/uploads/alien-png-1.png';

    const asteroidImg = new Image();
    asteroidImg.src = 'https://www.freeiconspng.com/uploads/asteroid-png-5.png';

    const explosionImg = new Image();
    explosionImg.src = 'https://www.freeiconspng.com/uploads/explosion-png-4.png';

    // Initialize game
    function initGame() {
        // Reset game state
        lasers.length = 0;
        aliens.length = 0;
        asteroids.length = 0;
        score = 0;
        gameTime = 0;
        difficulty = 1;
        gameScore.textContent = `Score: ${score}`;
        finalScore.textContent = `Score: ${score}`;
        
        // Reset ship position and state
        ship.x = canvas.width / 2;
        ship.y = canvas.height - 60;
        ship.isAlive = true;
        
        // Clear keys
        keys = {};
        
        // Start game
        gameRunning = true;
        gameOverlay.style.display = 'none';
        gameLoop();
    }

    // Start game button
    startBtn.addEventListener('click', initGame);

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' && gameRunning) {
            fireLaser();
        } else if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            keys[e.key] = true;
        }
    });

    document.addEventListener('keyup', function(e) {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            keys[e.key] = false;
        }
    });

    // Button controls
    document.getElementById('leftBtn').addEventListener('mousedown', () => keys['ArrowLeft'] = true);
    document.getElementById('leftBtn').addEventListener('mouseup', () => keys['ArrowLeft'] = false);
    document.getElementById('rightBtn').addEventListener('mousedown', () => keys['ArrowRight'] = true);
    document.getElementById('rightBtn').addEventListener('mouseup', () => keys['ArrowRight'] = false);
    document.getElementById('fireBtn').addEventListener('click', fireLaser);

    // Fire laser
    function fireLaser() {
        if (!gameRunning || !ship.isAlive) return;
        
        lasers.push({
            x: ship.x + ship.width / 2 - 2.5,
            y: ship.y,
            width: 5,
            height: 15,
            speed: 7,
            color: '#ff5555'
        });
        
        // Play laser sound
        playSound('laser');
    }

    // Play sound effects
    function playSound(type) {
        const sounds = {
            laser: {
                frequency: 220,
                type: 'square',
                duration: 0.1
            },
            explosion: {
                frequency: 100,
                type: 'sawtooth',
                duration: 0.3
            },
            alienHit: {
                frequency: 440,
                type: 'sine',
                duration: 0.2
            }
        };
        
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = sounds[type].type;
            oscillator.frequency.value = sounds[type].frequency;
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            gainNode.gain.exponentialRampToValueAtTime(
                0.0001, 
                audioCtx.currentTime + sounds[type].duration
            );
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + sounds[type].duration);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // Main game loop
    function gameLoop() {
        if (!gameRunning) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw space background
        drawSpaceBackground();
        
        // Update game state
        updateGame();
        
        // Draw game elements
        drawLasers();
        drawAliens();
        drawAsteroids();
        if (ship.isAlive) drawShip();
        
        // Continue game loop
        animationId = requestAnimationFrame(gameLoop);
    }

    // Draw space background with stars
    function drawSpaceBackground() {
        // Draw black background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = (Math.random() * canvas.height + (window.scrollY * 0.2)) % canvas.height;
            const size = Math.random() * 2;
            const opacity = Math.random();
            
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillRect(x, y, size, size);
        }
    }

    // Update game state
    function updateGame() {
        // Increase difficulty over time
        gameTime++;
        difficulty = 1 + Math.floor(gameTime / 1000);
        
        // Move ship
        if (keys['ArrowLeft'] && ship.x > 0) ship.x -= ship.speed;
        if (keys['ArrowRight'] && ship.x < canvas.width - ship.width) ship.x += ship.speed;
        
        // Move lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
            lasers[i].y -= lasers[i].speed;
            if (lasers[i].y < 0) lasers.splice(i, 1);
        }
        
        // Spawn aliens
        if (Date.now() - lastAlienSpawn > 2000 / difficulty) {
            spawnAlien();
            lastAlienSpawn = Date.now();
        }
        
        // Move aliens and check collisions
        for (let i = aliens.length - 1; i >= 0; i--) {
            aliens[i].y += aliens[i].speed;
            
            if (aliens[i].y > canvas.height) {
                aliens.splice(i, 1);
            } else if (ship.isAlive && checkCollision(ship, aliens[i])) {
                ship.isAlive = false;
                playSound('explosion');
                setTimeout(endGame, 1000);
            }
            
            // Check laser-alien collisions
            for (let j = lasers.length - 1; j >= 0; j--) {
                if (checkCollision(lasers[j], aliens[i])) {
                    score += 20;
                    gameScore.textContent = `Score: ${score}`;
                    aliens.splice(i, 1);
                    lasers.splice(j, 1);
                    playSound('alienHit');
                    break;
                }
            }
        }
        
        // Spawn asteroids
        if (Date.now() - lastAsteroidSpawn > 3000 / difficulty) {
            spawnAsteroid();
            lastAsteroidSpawn = Date.now();
        }
        
        // Move asteroids and check collisions
        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].y += asteroids[i].speed;
            asteroids[i].x += asteroids[i].xSpeed;
            
            // Bounce off walls
            if (asteroids[i].x <= 0 || asteroids[i].x + asteroids[i].width >= canvas.width) {
                asteroids[i].xSpeed *= -1;
            }
            
            if (asteroids[i].y > canvas.height) {
                asteroids.splice(i, 1);
            } else if (ship.isAlive && checkCollision(ship, asteroids[i])) {
                ship.isAlive = false;
                playSound('explosion');
                setTimeout(endGame, 1000);
            }
        }
    }

    // Spawn a new alien
    function spawnAlien() {
        aliens.push({
            x: Math.random() * (canvas.width - 30),
            y: -30,
            width: 30,
            height: 30,
            speed: 1 + Math.random() * difficulty
        });
    }

    // Spawn a new asteroid
    function spawnAsteroid() {
        asteroids.push({
            x: Math.random() * (canvas.width - 40),
            y: -40,
            width: 40,
            height: 40,
            speed: 1 + Math.random() * difficulty,
            xSpeed: (Math.random() - 0.5) * 2 * difficulty
        });
    }

    // Check collision between two objects
    function checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }

    // Draw ship
    function drawShip() {
        ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    // Draw lasers
    function drawLasers() {
        ctx.fillStyle = '#ff5555';
        lasers.forEach(laser => {
            ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
            
            // Add glow effect
            ctx.shadowColor = '#ff5555';
            ctx.shadowBlur = 10;
            ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
            ctx.shadowBlur = 0;
        });
    }

    // Draw aliens
    function drawAliens() {
        aliens.forEach(alien => {
            ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
            
            // Add pulsing glow effect
            const pulse = Math.sin(Date.now() / 200) * 5 + 10;
            ctx.shadowColor = '#00ff00';
            ctx.shadowBlur = pulse;
            ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
            ctx.shadowBlur = 0;
        });
    }

    // Draw asteroids
    function drawAsteroids() {
        asteroids.forEach(asteroid => {
            // Rotate asteroids slightly
            ctx.save();
            ctx.translate(asteroid.x + asteroid.width/2, asteroid.y + asteroid.height/2);
            ctx.rotate(Date.now() / 1000 * asteroid.xSpeed);
            ctx.drawImage(asteroidImg, -asteroid.width/2, -asteroid.height/2, asteroid.width, asteroid.height);
            ctx.restore();
        });
    }

    // Draw explosion
    function drawExplosion(x, y) {
        ctx.drawImage(explosionImg, x - 20, y - 20, 40, 40);
    }

    // End game
    function endGame() {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        gameOverlay.style.display = 'flex';
        document.querySelector('.game-over-text').textContent = 'Game Over';
        finalScore.textContent = `Final Score: ${score}`;
        
        // Draw final explosion
        if (!ship.isAlive) {
            drawExplosion(ship.x + ship.width/2, ship.y + ship.height/2);
        }
    }

    // Initialize game overlay
    gameOverlay.style.display = 'flex';

    // Terms Modal Functionality
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const termsClose = document.getElementById('termsClose');

    // Open terms modal
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close terms modal
    termsClose.addEventListener('click', () => {
        termsModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close when clicking outside content
    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) {
            termsModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (termsModal.classList.contains('show') && e.key === 'Escape') {
            termsModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

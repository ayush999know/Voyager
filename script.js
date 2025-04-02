
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const loginBtn = document.getElementById('login-btn');
    const aboutBtn = document.getElementById('about-btn');
    const cartBtn = document.getElementById('cart-btn');
    const trackBtn = document.getElementById('track-btn');
    const loginModal = document.getElementById('login-modal');
    const aboutModal = document.getElementById('about-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');
    const cartCount = document.querySelector('.cart-count');
    
    let cartItems = 0;
    
    // Open modals
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });
    
    aboutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'flex';
    });
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert(`You have ${cartItems} items in your cart.`);
    });
    
    trackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Order tracking feature coming soon!');
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', function() {
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Animation effect
        this.textContent = 'Added!';
        this.style.backgroundColor = '#3a7bd5';
        this.style.borderColor = '#3a7bd5';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = '#00d2ff';
        }, 1000);
    });
    
    // Buy now functionality
    buyNowBtn.addEventListener('click', function() {
        alert('Thank you for your purchase! The Voyager spacecraft will be delivered to your nearest spaceport shortly.');
    });
    
    // Stars parallax effect
    document.addEventListener('mousemove', function(e) {
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        const moveX = e.clientX / window.innerWidth - 0.5;
        const moveY = e.clientY / window.innerHeight - 0.5;
        
        stars.style.transform = `translate(${moveX * 30}px, ${moveY * 30}px)`;
        twinkling.style.transform = `translate(${moveX * 60}px, ${moveY * 60}px)`;
    });
});

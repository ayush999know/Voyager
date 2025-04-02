// Form Submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.elements[0].value,
        email: e.target.elements[1].value,
        phone: e.target.elements[2].value
    };

    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(formData));

    // Send email via FormSubmit
    try {
        await fetch('https://formsubmit.co/ajax/ayush99know@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, product: "Premium Product (₹5000)" })
        });
        
        window.location.href = 'order-success.html';
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Google Auth
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            alert("Logged in with Google!");
            // Auto-fill email if available
            const user = firebase.auth().currentUser;
            if (user) document.getElementById('orderForm').elements[1].value = user.email;
        })
        .catch(console.error);
});

// Guest Checkout
document.getElementById('guestCheckout').addEventListener('click', () => {
    document.getElementById('orderForm').style.display = 'block';
});

// Auto-fill last order
window.addEventListener('load', () => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
        const { name, email, phone } = JSON.parse(lastOrder);
        const form = document.getElementById('orderForm');
        form.elements[0].value = name;
        form.elements[1].value = email;
        form.elements[2].value = phone;
    }
});

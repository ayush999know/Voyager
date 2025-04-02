import { auth, provider, db, signInWithPopup, signOut, collection, addDoc } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Elements
const googleLoginBtn = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("userInfo");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");
const orderForm = document.getElementById("orderForm");

// Google Login
googleLoginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            displayUserInfo(user);
        })
        .catch((error) => {
            alert("Login Failed: " + error.message);
        });
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            userInfo.style.display = "none";
            logoutBtn.style.display = "none";
            googleLoginBtn.style.display = "block";
            orderForm.style.display = "none";
        })
        .catch((error) => {
            alert("Logout Failed: " + error.message);
        });
});

// Display User Info
function displayUserInfo(user) {
    userPhoto.src = user.photoURL;
    userName.textContent = `Hello, ${user.displayName}`;
    userInfo.style.display = "block";
    logoutBtn.style.display = "block";
    googleLoginBtn.style.display = "none";
    orderForm.style.display = "block";

    // Autofill name & email
    document.getElementById("name").value = user.displayName;
    document.getElementById("email").value = user.email;
}

// Detect Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserInfo(user);
    }
});

// Handle Order Submission
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        product: "Premium Product (₹5000)"
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        await addDoc(collection(db, "orders"), formData);
        alert("Order Placed Successfully!");
        window.location.href = "order-success.html";
    } catch (error) {
        alert("Error Placing Order: " + error.message);
    }
});

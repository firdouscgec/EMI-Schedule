//  <!-- Firebase Logic -->

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBj-Sdgzslk69NBU27z9gbcvjFJu3dEAe8",
    authDomain: "weatherdatabase-f38a9.firebaseapp.com",
    databaseURL: "https://weatherdatabase-f38a9-default-rtdb.firebaseio.com",
    projectId: "weatherdatabase-f38a9",
    storageBucket: "weatherdatabase-f38a9.firebasestorage.app",
    messagingSenderId: "323337839361",
    appId: "1:323337839361:web:3e637b56f997a81ae1f100"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementById("closeModal");
const resetEmail = document.getElementById("resetEmail");
const resetBtn = document.getElementById("resetBtn");
const resetMessage = document.getElementById("resetMessage");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
    setTimeout(() => {
        // message.style.display = 'none';
        message.className = '';
    }, 5000);
}

function showResetMessage(text, type) {
    resetMessage.textContent = text;
    resetMessage.className = type;
    resetMessage.style.display = 'block';
    setTimeout(() => {
        resetMessage.style.display = 'none';
        resetMessage.className = '';
    }, 5000);
}

togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = "block";
    resetEmail.value = emailInput.value;
});

closeModal.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none";
    resetMessage.style.display = 'none';
});

window.addEventListener("click", (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = "none";
        resetMessage.style.display = 'none';
    }
});

resetBtn.addEventListener("click", () => {
    const email = resetEmail.value.trim();
    if (!email) {
        showResetMessage("Please enter your email address", "error");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showResetMessage("✅ Password reset email sent! Check your inbox.", "success");
            setTimeout(() => {
                forgotPasswordModal.style.display = "none";
            }, 3000);
        })
        .catch((error) => {
            showResetMessage("❌ " + error.message, "error");
        });
});

signupBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage("Please enter both email and password", "error");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showMessage("✅ Sign up successful!", "success");
            setTimeout(() => {
                window.location.href = "EMI.html";
            }, 1000);
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                showMessage("❌ This email is already registered", "error");
            } else if (error.code === 'auth/weak-password') {
                showMessage("❌ Password should be at least 6 characters", "error");
            } else {
                showMessage("❌ " + error.message, "error");
            }
        });
});

loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage("Please enter both email and password", "error");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            showMessage("✅ Logged in successfully!", "success");
            setTimeout(() => {
                window.location.href = "EMI.html";
            }, 1000);
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                showMessage("❌ No account found with this email", "error");
            } else if (error.code === 'auth/wrong-password') {
                showMessage("❌ Incorrect password", "error");
            } else {
                showMessage("❌ Invalid email or password", "error");
            }
        });
});

googleBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            showMessage("✅ Google login successful!", "success");
            setTimeout(() => {
                window.location.href = "EMI.html";
            }, 1000);
        })
        .catch((error) => {
            showMessage("❌ " + error.message, "error");
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        showMessage("👋 Welcome, " + (user.displayName || user.email), "info");
    }
});

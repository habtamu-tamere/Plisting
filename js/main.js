
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAe-pRst0uNZBMOchQIIpAYlLdGrysZ950",
  authDomain: "etpro-a379f.firebaseapp.com",
  projectId: "etpro-a379f",
  storageBucket: "etpro-a379f.firebasestorage.app",
  messagingSenderId: "262837338820",
  appId: "1:262837338820:web:fe146633aede6d932fff91"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initAuth();
    initProperties();
    initModals();
    
    // Load featured properties
    loadFeaturedProperties();
});



// Initialize modals
function initModals() {
    // Login modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => showModal('login-modal'));
    }
    
    // Signup modal
    const signupBtn = document.getElementById('signup-btn');
    const signupModal = document.getElementById('signup-modal');
    
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', () => showModal('signup-modal'));
    }
    
    // Show signup from login
    const showSignup = document.getElementById('show-signup');
    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('login-modal');
            showModal('signup-modal');
        });
    }
    
    // Show login from signup
    const showLogin = document.getElementById('show-login');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('signup-modal');
            showModal('login-modal');
        });
    }
    
    // Post property button
    const postPropertyBtn = document.getElementById('post-property-btn');
    if (postPropertyBtn) {
        postPropertyBtn.addEventListener('click', () => {
            const user = auth.currentUser;
            if (user) {
                window.location.href = 'post-property.html';
            } else {
                showModal('login-modal');
            }
        });
    }
    
    // Close modals when clicking X or outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
                closeModal(modal.id);
            }
        });
    });
}

// Show modal
function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Show notification toast
function showNotification(message, type) {
    const toast = document.getElementById('notification-toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toast.className = 'toast show ' + type;
    toastMessage.textContent = message;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

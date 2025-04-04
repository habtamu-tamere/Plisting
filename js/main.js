// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6m95mbim9ftrMdzRAIvyYLu902LDMFoc",
    authDomain: "realestate-4a5e6.firebaseapp.com",
    projectId: "realestate-4a5e6",
    storageBucket: "realestate-4a5e6.firebasestorage.app",
    messagingSenderId: "440556777624",
    appId: "1:440556777624:web:ec982b1855a4b1f06de0ed",
    measurementId: "G-V8GM1SFQPL"
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
    initMobileMenu()
    
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
// Initialize mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle mobile menu
            navLinks.classList.toggle('show');
            // Add to your mobile menu toggle function
            document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : 'auto';
            
            // Toggle burger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Toggle auth buttons if they exist
            if (authButtons) {
                authButtons.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                
                if (authButtons) {
                    authButtons.style.display = 'none';
                }
            });
        });
    }
}

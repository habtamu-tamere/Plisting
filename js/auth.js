
// Initialize authentication
function initAuth() {
    // Check auth state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            updateAuthUI(user);
            
            // Check if user is verified
            if (!user.emailVerified) {
                showNotification('Please verify your email address', 'warning');
            }
        } else {
            // User is signed out
            updateAuthUI(null);
        }
    });
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                const { user } = await auth.signInWithEmailAndPassword(email, password);
                showNotification('Login successful', 'success');
                closeModal('login-modal');
            } catch (error) {
                handleAuthError(error);
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const userType = document.getElementById('user-type').value;
            
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                
                // Send verification email
                await user.sendEmailVerification();
                
                // Save user data to Firestore
                await db.collection('users').doc(user.uid).set({
                    name,
                    email,
                    userType,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    subscription: userType === 'developer' ? 'inactive' : null
                });
                
                showNotification('Account created successfully. Please check your email for verification.', 'success');
                closeModal('signup-modal');
            } catch (error) {
                handleAuthError(error);
            }
        });
    }
    
    // Google login
    const googleLoginBtn = document.querySelector('.google-login');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    
                    // Check if user exists in Firestore
                    db.collection('users').doc(user.uid).get()
                        .then(doc => {
                            if (!doc.exists) {
                                // Save user data if new
                                db.collection('users').doc(user.uid).set({
                                    name: user.displayName,
                                    email: user.email,
                                    userType: 'regular',
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                            }
                        });
                    
                    showNotification('Login successful', 'success');
                    closeModal('login-modal');
                })
                .catch(error => {
                    handleAuthError(error);
                });
        });
    }
    
    // Facebook login
    const facebookLoginBtn = document.querySelector('.facebook-login');
    if (facebookLoginBtn) {
        facebookLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    
                    // Check if user exists in Firestore
                    db.collection('users').doc(user.uid).get()
                        .then(doc => {
                            if (!doc.exists) {
                                // Save user data if new
                                db.collection('users').doc(user.uid).set({
                                    name: user.displayName,
                                    email: user.email,
                                    userType: 'regular',
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                            }
                        });
                    
                    showNotification('Login successful', 'success');
                    closeModal('login-modal');
                })
                .catch(error => {
                    handleAuthError(error);
                });
        });
    }
}

// Update UI based on auth state
function updateAuthUI(user) {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const postPropertyBtn = document.getElementById('post-property-btn');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (user) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        
        // Create user dropdown
        const dropdownHTML = `
            <div class="user-dropdown">
                <button class="user-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>${user.displayName || user.email.split('@')[0]}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="dashboard.html" data-i18n="dashboard">Dashboard</a>
                    <a href="#" id="logout-btn" data-i18n="logout">Logout</a>
                </div>
            </div>
        `;
        
        if (authButtons) {
            authButtons.innerHTML = dropdownHTML;
            
            // Initialize dropdown
            const userBtn = document.querySelector('.user-btn');
            const dropdownContent = document.querySelector('.dropdown-content');
            
            userBtn.addEventListener('click', () => {
                dropdownContent.classList.toggle('show');
            });
            
            // Logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    auth.signOut()
                        .then(() => {
                            showNotification('Logged out successfully', 'success');
                        })
                        .catch(error => {
                            handleAuthError(error);
                        });
                });
            }
        }
        
        // Update post property button if exists
        if (postPropertyBtn) {
            postPropertyBtn.style.display = 'block';
            postPropertyBtn.addEventListener('click', () => {
                window.location.href = 'post-property.html';
            });
        }
    } else {
        // User is logged out
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) signupBtn.style.display = 'block';
        
        if (authButtons) {
            authButtons.innerHTML = `
                <button id="post-property-btn" data-i18n="post_property">Post Property</button>
                <button id="login-btn" data-i18n="login">Login</button>
                <button id="signup-btn" data-i18n="signup">Sign Up</button>
            `;
            
            // Reinitialize buttons
            initModals();
        }
        
        // Update post property button if exists
        if (postPropertyBtn) {
            postPropertyBtn.style.display = 'block';
            postPropertyBtn.addEventListener('click', () => {
                showModal('login-modal');
            });
        }
    }
}

// Handle authentication errors
function handleAuthError(error) {
    let message = '';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = 'Email already in use';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address';
            break;
        case 'auth/weak-password':
            message = 'Password should be at least 6 characters';
            break;
        case 'auth/user-not-found':
            message = 'User not found';
            break;
        case 'auth/wrong-password':
            message = 'Wrong password';
            break;
        case 'auth/too-many-requests':
            message = 'Too many requests. Try again later';
            break;
        case 'auth/account-exists-with-different-credential':
            message = 'Account exists with different credential';
            break;
        case 'auth/popup-closed-by-user':
            // User closed the popup, no need to show error
            return;
        default:
            message = 'Authentication error. Please try again';
            console.error(error);
    }
    
    showNotification(message, 'error');
}

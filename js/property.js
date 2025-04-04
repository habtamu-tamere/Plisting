// Initialize properties
function initProperties() {
    // Load properties based on page
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        loadFeaturedProperties();
    } else if (path === 'buy.html') {
        loadProperties('buy');
    } else if (path === 'rent.html') {
        loadProperties('rent');
    } else if (path === 'shortlet.html') {
        loadProperties('shortlet');
    } else if (path === 'post-property.html') {
        initPostProperty();
    } else if (path === 'dashboard.html') {
        initDashboard();
    }
}

// Load featured properties
function loadFeaturedProperties() {
    const propertiesGrid = document.getElementById('featured-properties');
    
    if (!propertiesGrid) return;
    
    db.collection('properties')
        .where('featured', '==', true)
        .limit(6)
        .get()
        .then(snapshot => {
            propertiesGrid.innerHTML = '';
            
            if (snapshot.empty) {
                propertiesGrid.innerHTML = '<p data-i18n="no_properties">No featured properties found</p>';
                return;
            }
            
            snapshot.forEach(doc => {
                const property = doc.data();
                propertiesGrid.appendChild(createPropertyCard(property, doc.id));
            });
        })
        .catch(error => {
            console.error('Error loading properties:', error);
            showNotification('Error loading properties', 'error');
        });
}

// Load properties by type
function loadProperties(type) {
    const propertiesGrid = document.getElementById('properties-grid') || document.getElementById('featured-properties');
    
    if (!propertiesGrid) return;
    
    propertiesGrid.innerHTML = '<div class="loading-spinner"></div>';
    
    let query = db.collection('properties').where('type', '==', type);
    
    // Apply filters if any
    const urlParams = new URLSearchParams(window.location.search);
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const bedrooms = urlParams.get('bedrooms');
    const propertyType = urlParams.get('propertyType');
    
    if (minPrice) query = query.where('price', '>=', parseInt(minPrice));
    if (maxPrice) query = query.where('price', '<=', parseInt(maxPrice));
    if (bedrooms) query = query.where('bedrooms', '==', parseInt(bedrooms));
    if (propertyType) query = query.where('propertyType', '==', propertyType);
    
    query.get()
        .then(snapshot => {
            propertiesGrid.innerHTML = '';
            
            if (snapshot.empty) {
                propertiesGrid.innerHTML = '<p data-i18n="no_properties">No properties found</p>';
                return;
            }
            
            snapshot.forEach(doc => {
                const property = doc.data();
                propertiesGrid.appendChild(createPropertyCard(property, doc.id));
            });
        })
        .catch(error => {
            console.error('Error loading properties:', error);
            showNotification('Error loading properties', 'error');
            propertiesGrid.innerHTML = '<p data-i18n="error_loading">Error loading properties</p>';
        });
}

// Create property card element
function createPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images[0] || 'images/default-property.jpg'}" alt="${property.title}">
        </div>
        <div class="property-details">
            <div class="property-price">ETB ${property.price.toLocaleString()}</div>
            <div class="property-address">${property.address}</div>
            <div class="property-features">
                <span class="property-feature"><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                <span class="property-feature"><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                <span class="property-feature"><i class="fas fa-ruler-combined"></i> ${property.area} sqm</span>
            </div>
            <div class="property-type">${property.propertyType}</div>
            <a href="property-details.html?id=${id}" class="view-details-btn" data-i18n="view_details">View Details</a>
        </div>
    `;
    
    return card;
}

// Initialize post property functionality
function initPostProperty() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    const postForm = document.getElementById('post-property-form');
    if (!postForm) return;
    
    // Check user type and payment status
    db.collection('users').doc(user.uid).get()
        .then(doc => {
            const userData = doc.data();
            
            if (userData.userType === 'developer') {
                // Check subscription status
                if (userData.subscription !== 'active') {
                    showPaymentModal('subscription');
                }
            } else {
                // Regular user - show pay per post
                showPaymentModal('single');
            }
        });
    
    // Handle form submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('property-title').value;
        const description = document.getElementById('property-description').value;
        const type = document.getElementById('property-type').value;
        const propertyType = document.getElementById('property-category').value;
        const price = parseInt(document.getElementById('property-price').value);
        const bedrooms = parseInt(document.getElementById('property-bedrooms').value);
        const bathrooms = parseInt(document.getElementById('property-bathrooms').value);
        const area = parseInt(document.getElementById('property-area').value);
        const address = document.getElementById('property-address').value;
        const city = document.getElementById('property-city').value;
        const featured = document.getElementById('property-featured').checked;
        const images = document.getElementById('property-images').files;
        
        // Validate inputs
        if (!title || !description || !price || !address || images.length === 0) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Upload images
        try {
            const imageUrls = await uploadImages(images);
            
            // Create property object
            const property = {
                title,
                description,
                type,
                propertyType,
                price,
                bedrooms,
                bathrooms,
                area,
                address,
                city,
                featured,
                images: imageUrls,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            // Save to Firestore
            await db.collection('properties').add(property);
            
            // Update user's post count or subscription usage
            await updateUserPostStatus(user.uid);
            
            showNotification('Property posted successfully', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } catch (error) {
            console.error('Error posting property:', error);
            showNotification('Error posting property', 'error');
        }
    });
}

// Upload images to Firebase Storage
async function uploadImages(images) {
    const uploadPromises = [];
    
    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const storageRef = storage.ref(`property-images/${Date.now()}_${file.name}`);
        const uploadTask = storageRef.put(file);
        
        uploadPromises.push(
            new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    null,
                    error => reject(error),
                    async () => {
                        const url = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve(url);
                    }
                );
            })
        );
    }
    
    return Promise.all(uploadPromises);
}

// Update user's post status
async function updateUserPostStatus(userId) {
    const userRef = db.collection('users').doc(userId);
    
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    
    if (userData.userType === 'developer') {
        // For developers with subscription, track usage
        await userRef.update({
            postsThisMonth: firebase.firestore.FieldValue.increment(1)
        });
    } else {
        // For regular users, track single post
        await userRef.update({
            lastPostDate: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}

// Initialize dashboard
function initDashboard() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load user's properties
    db.collection('properties')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
            const propertiesList = document.getElementById('user-properties');
            
            if (snapshot.empty) {
                propertiesList.innerHTML = '<p data-i18n="no_properties">You have no properties yet</p>';
                return;
            }
            
            snapshot.forEach(doc => {
                const property = doc.data();
                const propertyElement = createDashboardPropertyCard(property, doc.id);
                propertiesList.appendChild(propertyElement);
            });
        });
    
    // Load user data
    db.collection('users').doc(user.uid).get()
        .then(doc => {
            const userData = doc.data();
            document.getElementById('user-name').textContent = userData.name;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-type').textContent = userData.userType;
            
            if (userData.userType === 'developer') {
                document.getElementById('subscription-info').style.display = 'block';
                document.getElementById('subscription-status').textContent = userData.subscription || 'inactive';
            }
        });
}

// Create property card for dashboard
function createDashboardPropertyCard(property, id) {
    const card = document.createElement('div');
    card.className = 'dashboard-property-card';
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.images[0] || 'images/default-property.jpg'}" alt="${property.title}">
        </div>
        <div class="property-info">
            <h3>${property.title}</h3>
            <p>${property.type} • ${property.propertyType} • ETB ${property.price.toLocaleString()}</p>
            <p>${property.address}</p>
            <div class="property-actions">
                <a href="property-details.html?id=${id}" class="view-btn" data-i18n="view">View</a>
                <button class="edit-btn" data-id="${id}" data-i18n="edit">Edit</button>
                <button class="delete-btn" data-id="${id}" data-i18n="delete">Delete</button>
            </div>
        </div>
    `;
    
    // Add event listeners for edit and delete
    card.querySelector('.edit-btn').addEventListener('click', () => editProperty(id));
    card.querySelector('.delete-btn').addEventListener('click', () => deleteProperty(id));
    
    return card;
}

// Edit property
function editProperty(id) {
    // Load property data and populate form
    db.collection('properties').doc(id).get()
        .then(doc => {
            if (doc.exists) {
                const property = doc.data();
                
                // Populate form (assuming you have an edit page or modal)
                document.getElementById('edit-property-title').value = property.title;
                document.getElementById('edit-property-description').value = property.description;
                document.getElementById('edit-property-type').value = property.type;
                document.getElementById('edit-property-category').value = property.propertyType;
                document.getElementById('edit-property-price').value = property.price;
                document.getElementById('edit-property-bedrooms').value = property.bedrooms;
                document.getElementById('edit-property-bathrooms').value = property.bathrooms;
                document.getElementById('edit-property-area').value = property.area;
                document.getElementById('edit-property-address').value = property.address;
                document.getElementById('edit-property-city').value = property.city;
                document.getElementById('edit-property-featured').checked = property.featured;
                
                // Store property ID in hidden field
                document.getElementById('edit-property-id').value = id;
                
                // Show edit modal
                showModal('edit-property-modal');
            }
        });
}

// Delete property
function deleteProperty(id) {
    if (confirm('Are you sure you want to delete this property?')) {
        db.collection('properties').doc(id).delete()
            .then(() => {
                showNotification('Property deleted successfully', 'success');
                // Refresh the list
                initDashboard();
            })
            .catch(error => {
                console.error('Error deleting property:', error);
                showNotification('Error deleting property', 'error');
            });
    }
}

// Show payment modal based on user type
function showPaymentModal(type) {
    const paymentModal = document.getElementById('payment-modal');
    const paymentContent = document.getElementById('payment-content');
    
    if (type === 'subscription') {
        paymentContent.innerHTML = `
            <h2 data-i18n="subscription_required">Subscription Required</h2>
            <p data-i18n="developer_subscription_text">As a real estate developer, you need an active subscription to post properties.</p>
            <div class="subscription-plans">
                <div class="plan">
                    <h3 data-i18n="monthly_plan">Monthly Plan</h3>
                    <p class="price">ETB 1,000 <span data-i18n="per_month">/month</span></p>
                    <ul>
                        <li data-i18n="unlimited_posts">Unlimited property posts</li>
                        <li data-i18n="featured_listings">Featured listings</li>
                        <li data-i18n="priority_support">Priority support</li>
                    </ul>
                    <button id="subscribe-monthly" class="subscribe-btn" data-i18n="subscribe">Subscribe</button>
                </div>
                <div class="plan recommended">
                    <h3 data-i18n="annual_plan">Annual Plan</h3>
                    <p class="price">ETB 10,000 <span data-i18n="per_year">/year</span></p>
                    <p class="savings" data-i18n="save_20">Save 20%</p>
                    <ul>
                        <li data-i18n="unlimited_posts">Unlimited property posts</li>
                        <li data-i18n="featured_listings">Featured listings</li>
                        <li data-i18n="priority_support">Priority support</li>
                        <li data-i18n="free_featured">1 free featured property per month</li>
                    </ul>
                    <button id="subscribe-annual" class="subscribe-btn" data-i18n="subscribe">Subscribe</button>
                </div>
            </div>
        `;
    } else {
        paymentContent.innerHTML = `
            <h2 data-i18n="payment_required">Payment Required</h2>
            <p data-i18n="single_post_text">To post a property, please pay the one-time listing fee.</p>
            <div class="single-payment">
                <p class="price">ETB 200 <span data-i18n="per_post">per post</span></p>
                <p data-i18n="post_validity">Your post will be active for 30 days</p>
                <button id="pay-single" class="pay-btn" data-i18n="pay_now">Pay Now</button>
            </div>
        `;
    }
    
    // Show the modal
    showModal('payment-modal');
    
    // Initialize payment buttons
    if (type === 'subscription') {
        document.getElementById('subscribe-monthly').addEventListener('click', () => initiatePayment('monthly'));
        document.getElementById('subscribe-annual').addEventListener('click', () => initiatePayment('annual'));
    } else {
        document.getElementById('pay-single').addEventListener('click', () => initiatePayment('single'));
    }
}

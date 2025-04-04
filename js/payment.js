// Initialize payment functionality
function initiatePayment(type) {
    const user = auth.currentUser;
    if (!user) return;
    
    let amount, description, paymentType;
    
    switch (type) {
        case 'monthly':
            amount = 1000;
            description = 'Monthly subscription for real estate developers';
            paymentType = 'subscription';
            break;
        case 'annual':
            amount = 10000;
            description = 'Annual subscription for real estate developers';
            paymentType = 'subscription';
            break;
        case 'single':
            amount = 200;
            description = 'Single property post payment';
            paymentType = 'single';
            break;
        default:
            return;
    }
    
    // Show payment options
    const paymentOptions = document.createElement('div');
    paymentOptions.className = 'payment-options';
    paymentOptions.innerHTML = `
        <h3 data-i18n="choose_payment">Choose Payment Method</h3>
        <button id="telebirr-pay" class="payment-method">
            <img src="images/telebirr-logo.png" alt="Telebirr">
            <span data-i18n="pay_with_telebirr">Pay with Telebirr</span>
        </button>
        <button id="cbebirr-pay" class="payment-method">
            <img src="images/cbebirr-logo.png" alt="CBE Birr">
            <span data-i18n="pay_with_cbebirr">Pay with CBE Birr</span>
        </button>
    `;
    
    // Replace payment content
    const paymentContent = document.getElementById('payment-content');
    paymentContent.innerHTML = '';
    paymentContent.appendChild(paymentOptions);
    
    // Add event listeners
    document.getElementById('telebirr-pay').addEventListener('click', () => processPayment('telebirr', amount, description, paymentType));
    document.getElementById('cbebirr-pay').addEventListener('click', () => processPayment('cbebirr', amount, description, paymentType));
}

// Process payment
function processPayment(gateway, amount, description, paymentType) {
    // In a real app, you would integrate with the actual payment gateway APIs
    // This is a simulation of the payment flow
    
    showNotification(`Redirecting to ${gateway} payment...`, 'info');
    
    // Simulate payment processing
    setTimeout(() => {
        // In a real app, you would verify the payment with the gateway
        const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        if (paymentSuccess) {
            completePayment(amount, description, paymentType, gateway);
        } else {
            showNotification('Payment failed. Please try again.', 'error');
        }
    }, 2000);
}

// Complete payment and update user status
function completePayment(amount, description, paymentType, gateway) {
    const user = auth.currentUser;
    const paymentRef = db.collection('payments').doc();
    const userRef = db.collection('users').doc(user.uid);
    
    const paymentData = {
        userId: user.uid,
        amount,
        description,
        paymentType,
        gateway,
        status: 'completed',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // For subscriptions, calculate expiry date
    if (paymentType === 'subscription') {
        const months = amount === 1000 ? 1 : 12;
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + months);
        
        paymentData.expiryDate = expiryDate;
    }
    
    // Save payment record
    paymentRef.set(paymentData)
        .then(() => {
            // Update user status based on payment type
            if (paymentType === 'subscription') {
                return userRef.update({
                    subscription: 'active',
                    subscriptionExpiry: paymentData.expiryDate,
                    subscriptionType: amount === 1000 ? 'monthly' : 'annual'
                });
            } else {
                return userRef.update({
                    lastPostDate: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        })
        .then(() => {
            showNotification('Payment successful!', 'success');
            closeModal('payment-modal');
            
            // If this was for posting a property, enable the form
            if (paymentType === 'single') {
                document.getElementById('post-property-form').classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Error completing payment:', error);
            showNotification('Error processing payment', 'error');
        });
}

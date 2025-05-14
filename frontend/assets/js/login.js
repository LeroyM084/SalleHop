// Main JavaScript file for the login page

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Here you would normally make an API call to your backend
            console.log('Tentative de connexion avec:', email);
            
            // For demo purposes, simulate API call with a timeout
            simulateLogin(email, password);
        });
    }
    
    // Add event listener for "Créer un compte" button
    const createAccountBtn = document.querySelector('.create-account button');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function() {
            // Redirect to registration page or show registration modal
            console.log('Redirection vers la page de création de compte');
            // window.location.href = 'register.html';
        });
    }
    
    // Add event listener for "Mot de passe oublié" link
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Show forgot password modal or redirect to forgot password page
            console.log('Redirection vers la page de récupération de mot de passe');
            // window.location.href = 'forgot-password.html';
        });
    }
});

function simulateLogin(email, password) {
    // Show loading indicator
    const loginBtn = document.querySelector('.btn-primary');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Connexion en cours...';
    loginBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(function() {
        // For demo, let's assume login is successful
        console.log('Connexion réussie!');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
        // In case of error, you would show an error message and reset the button
        // loginBtn.textContent = originalText;
        // loginBtn.disabled = false;
        // alert('Identifiants incorrects. Veuillez réessayer.');
    }, 1000);
}
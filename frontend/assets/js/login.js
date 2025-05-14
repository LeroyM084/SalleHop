document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const motdepasse = document.getElementById('password').value; // <-- use motdepasse

            // Validation basique
            if (!email || !motdepasse) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            try {
                // Use a dynamic base URL for the API
                const apiUrl = 'http://localhost:8200/api/auth/login'; 
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'email' : email , "motdepasse" : motdepasse }), 
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Connexion réussie:', data);

                    // Stocker le token dans le localStorage ou un cookie
                    localStorage.setItem('token', data.token);

                    // Rediriger vers le tableau de bord
                    window.location.href = 'dashboard.html';
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Identifiants incorrects.');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }

    // Gestion du bouton "Créer un compte"
    const createAccountBtn = document.querySelector('.create-account button');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function () {
            console.log('Redirection vers la page de création de compte');
            window.location.href = 'register.html';
        });
    }

    // Gestion du lien "Mot de passe oublié"
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Redirection vers la page de récupération de mot de passe');
            window.location.href = 'forgot-password.html';
        });
    }
});
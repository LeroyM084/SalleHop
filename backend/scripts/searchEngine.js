const { Definir, creneau, utilisateur } = require('../models');

(async () => {
    try {
        const resultatsRecherche = await utilisateur.findAll();
        console.log('Résultats de la recherche :', resultatsRecherche);
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
})();

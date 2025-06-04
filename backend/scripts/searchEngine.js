const { Definir, creneau } = require('../models');

(async () => {
    try {
        const resultatsRecherche = await creneau.findAll();
        console.log('Résultats de la recherche :', resultatsRecherche);
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
})();

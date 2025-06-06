const { utilisateur, groupe, Appartenir } = require('../models');

(async () => {
    try {
        // Variables pour l'identification
        const userId = 3;
        const oldGroupId = 6;
        const newGroupId = 7;

        // 1. Supprimer l'ancienne relation
        console.log('Suppression de l\'ancienne relation...');
        const deleteResult = await Appartenir.destroy({
            where: {
                utilisateur_id: userId,
                groupe_id: oldGroupId
            }
        });

        // 2. Créer la nouvelle relation
        console.log('Création de la nouvelle relation...');
        const newRelation = await Appartenir.create({
            utilisateur_id: userId,
            groupe_id: newGroupId,
            ecole_id: 1 
        });

        console.log('Modification effectuée avec succès!');
        console.log(`L'utilisateur ${userId} a été déplacé du groupe ${oldGroupId} vers le groupe ${newGroupId}`);

    } catch (error) {
        console.error('Erreur lors de la modification:', error.message);
    }
})();
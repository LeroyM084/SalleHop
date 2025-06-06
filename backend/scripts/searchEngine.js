const { Definir, creneau, cours, salle, campus, groupe } = require('../models');

(async () => {
    try {
        const resultatsRecherche = await Definir.findAll({
            include: [
                {
                    model: creneau,
                    include: [
                        {
                            model: cours,
                            through: { attributes: [] },
                            attributes: ['identifiant', 'nom'],
                            include: [
                                {
                                    model: groupe,
                                    through: { attributes: [] },
                                    attributes: ['identifiant', 'nom', 'est_etudiant']
                                }
                            ]
                        }
                    ],
                    attributes: ['identifiant', 'date', 'heure_debut', 'heure_fin', 'status']
                },
                {
                    model: salle,
                    attributes: ['identifiant', 'nom'],
                    include: [
                        {
                            model: campus,
                            attributes: ['nom']
                        }
                    ]
                }
            ],
            attributes: ['cours_id', 'salle_id', 'creneau_id'] // Correction ici
        });

        // Formatage amélioré des résultats
        const resultatsFormates = resultatsRecherche.map(definir => ({
            definir: {
                cours_id: definir.cours_id,
                salle_id: definir.salle_id,
                creneau_id: definir.creneau_id
            },
            creneau: {
                id: definir.creneau.identifiant,
                date: definir.creneau.date,
                debut: definir.creneau.heure_debut,
                fin: definir.creneau.heure_fin,
                status: definir.creneau.status
            },
            cours: definir.creneau.cours.map(c => ({
                id: c.identifiant,
                nom: c.nom,
                groupes: c.groupes.map(g => ({
                    id: g.identifiant,
                    nom: g.nom,
                    est_etudiant: g.est_etudiant
                }))
            })),
            salle: {
                id: definir.salle.identifiant,
                nom: definir.salle.nom,
                campus: definir.salle.campus.nom
            }
        }));

        console.log('Résultats de la recherche :', JSON.stringify(resultatsFormates, null, 2));
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
})();


const { 
    utilisateur, 
    groupe, 
    cours, 
    creneau, 
    salle, 
    campus,
    Appartenir,
    Correspondre,
    Definir,
    Enseigner
} = require('../models');

async function linkDataForMateo() {
    try {
        // 1. Récupérer l'utilisateur Mateo (id: 3)
        const mateo = await utilisateur.findByPk(3);
        if (!mateo) {
            throw new Error('Utilisateur Mateo non trouvé');
        }

        // 2. Créer un nouveau groupe
        const newGroupe = await groupe.create({
            nom: 'Groupe de Mateo',
            est_etudiant: true,
            ecole_id: 1
        });

        // 3. Mettre à jour ou créer l'association Mateo-Groupe-École
        await Appartenir.upsert({
            utilisateur_id: mateo.identifiant,
            groupe_id: newGroupe.identifiant,
            ecole_id: 1
        });

        // 4. Créer un campus et une salle
        const newCampus = await campus.create({
            nom: 'Campus Test',
            adresse: '123 rue de Test'
        });

        const newSalle = await salle.create({
            nom: 'Salle Test',
            campus_id: newCampus.identifiant
        });

        // 5. Créer des cours
        const courses = await Promise.all([
            cours.create({
                nom: 'Cours Test 1',
                nombre_heures_total: 30
            }),
            cours.create({
                nom: 'Cours Test 2',
                nombre_heures_total: 20
            })
        ]);

        // 6. Lier les cours au groupe
        await Promise.all(courses.map(course => 
            Correspondre.create({
                groupe_id: newGroupe.identifiant,
                cours_id: course.identifiant
            })
        ));

        // 7. Créer des créneaux pour cette semaine
        const today = new Date();
        const creneaux = await Promise.all([
            creneau.create({
                date: today,
                heure_debut: '09:00:00',
                heure_fin: '11:00:00',
                status: 'en attente'
            }),
            creneau.create({
                date: new Date(today.setDate(today.getDate() + 1)),
                heure_debut: '14:00:00',
                heure_fin: '16:00:00',
                status: 'en attente'
            })
        ]);

        // 8. Lier les créneaux aux cours et à la salle
        await Promise.all(creneaux.map((creneau, index) =>
            Definir.create({
                cours_id: courses[index].identifiant,
                creneau_id: creneau.identifiant,
                salle_id: newSalle.identifiant,
                groupe_id: newGroupe.identifiant  // Ajout du groupe_id manquant
            })
        ));

        // 9. Faire de Mateo un enseignant pour ces cours
        await Promise.all(courses.map(course =>
            Enseigner.create({
                utilisateur_id: mateo.identifiant,
                cours_id: course.identifiant
            })
        ));

        console.log('Données de test créées et reliées avec succès pour Mateo !');

    } catch (error) {
        console.error('Erreur détaillée:', error?.parent?.detail || error);
        throw error;
    }
}

// Exécuter le script
linkDataForMateo().catch(console.error);
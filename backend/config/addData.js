const Membre = require('../models/Utilisateur')
const Reservation = require('../models/Reservation')
const bcrypt = require('bcrypt')


const addMembre = async() => {
const user = await Membre.create({
    nom : 'Matéo',
    prenom : 'Leroy',
    email : 'mleroy@supdevinci-edu.fr',
    status : 'admin',
    idCampus : 1,
    motdepasse : await bcrypt.hash('salope123',10)
})

const token = user.token
const id = user.id 

const isUser = await Membre.findByPk(id)

console.log(isUser)
}

const delMembre = async() => {
    const user = await Membre.destroy({
        where : {
            nom : 'test',
            prenom : 'test',
            email : 'test@test.com',
            idCampus : 1
        }   
    })


    console.log("OK")
}

const addReservationToTestUser = async() => {
    const resaValide = {
        idSalle :  1,
        idPromo : 1,
        idMembre : 4,
        date : "2025-05-27",
        heureDebut : '12:00:00',
        heureFin : '16:00:00',
        statut:'valide',
        idCampus:1
    }

    const resa = await Reservation.create(resaValide);
    
    const isExist = await Reservation.findByPk(resa.id);
    if(!isExist){
        console.log("Ca a pas marche")
    }

    console.log("Ca a fonctionnée")
}

addReservationToTestUser()
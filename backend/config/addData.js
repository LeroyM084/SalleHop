const Membre = require('../models/Membre')
const bcrypt = require('bcrypt')


const addMembre = async() => {
const user = await Membre.create({
    nom : 'test',
    prenom : 'test',
    email : 'test@test.com',
    status : 'admin',
    idCampus : 1,
    motdepasse : await bcrypt.hash('motdepassefort123',10)
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

addMembre()
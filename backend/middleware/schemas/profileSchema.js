const JOI = require('joi');
const CAMPUS_LISTE = require('../../const/campusList.util');

const profileSchema = JOI.object({
    nom : JOI.string().min(2).max(20),
    prenom : JOI.string().min(2).max(20),
    email : JOI.string().email(),
    campusName : JOI.string().valid(CAMPUS_LISTE)
})

const changePasswordSchema = JOI.object({
    oldMotDePasse : JOI.string().required(),
    motDepasse : JOI.string().min(6).max(30).required()
})

module.exports = {
    changePasswordSchema,
    profileSchema
}
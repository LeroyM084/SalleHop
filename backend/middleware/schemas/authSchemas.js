const JOI = require('joi');

const signUpSchema = JOI.object({
    email: JOI.string().email().required(),
    motdepasse: JOI.string().min(6).max(50).required(), // Correction ici
    nom: JOI.string().min(2).max(30).required(),
    prenom: JOI.string().min(2).max(30).required(),
    role: JOI.string().valid('admin', 'formateur', 'etudiant').default('formateur').required(),
    campusName: JOI.string().required(),
})

const loginSchema = JOI.object({
    email: JOI.string().email().required(),
    motdepasse: JOI.string().min(6).max(50).required(),
})

module.exports = {
    signUpSchema,
    loginSchema,
}

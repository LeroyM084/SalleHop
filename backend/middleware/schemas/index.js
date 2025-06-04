const { loginSchema, signUpSchema } = require('./authSchemas');

// Permet d'avoir tous les schémas de validation au même endroit
// Facilite l'import dans d'autres fichiers. 

module.exports = {
    loginSchema,
    signUpSchema
}
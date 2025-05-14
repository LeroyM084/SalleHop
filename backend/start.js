const app = require('./server')
const PORT = 3000 // port de base, peut changer -- DEBUG

/*
@TODO 
Passer en https au plus vite -> Mot de passe en clair sur ce ptn 
de WireShark sinon. 
-> Avoir un certificat 
-> Non je fais trop l'acteur en vrai même moi jsp
*/

app.listen(PORT, () => {
    console.log('SalleHop en ligne ! ✅')
    console.log('Début de l\'API : http://localhost:',PORT)
})
const app = require('../../server.js')
const supertest = require('supertest')
const dotenv = require('dotenv')
dotenv.config()
const API_URL = process.env.API_URL + '/api/auth/signup';

// Ce fichier définit des tests pour les connexions 
describe('POST /api/auth/signup', async => {
    let validUser;
    beforeAll(async () => {
        validUser = {
            nom : 'test',
            prenom : 'test',
            email : 'test@test.com',
            password : 'testPassword',
            status : 'admin',
            idCampus : 1,
        }
    });

    afterAll(async () => {
        await Membre.destroy({
            where: {
                nom: 'test',
                prenom: 'test',
                email: 'test@test.com'
            }
        })
    });

    // -- TESTS --

    test('Devrait inscire un utilisatuer avec donnée valide', async () => {
        const userRes = await post(API_URL)
            .authorization
    })
}
)
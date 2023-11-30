const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests

        const user = {
            email: 'test@gmail.com',
            password: 'test1234',
            firstName: 'test',
            lastName: 'test',
            phone: '1234567890'
        }
        const res = await request(app).post('/users').send(user);
        console.log("testMigrate", res.status)

        sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
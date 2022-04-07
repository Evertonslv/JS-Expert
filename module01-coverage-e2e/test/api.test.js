const {describe, it} = require('mocha')
const request = require('supertest')
const api = require('../src/api')
const assert = require('assert')

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async() => {
            const response = await request(api).get('/contact').expect(200)
            assert.deepStrictEqual(response.text, 'Contact us page!')
        });
    })

    describe('/hello', () => {
        it('should request an inextent route /hi and redirect to /hello', async() => {
            const response = await request(api)
                .get('/hi')
                .expect(200)

            assert.deepStrictEqual(response.text, 'Hello Wolrd!')
        });
    })

    describe('/login', () => {
        it('should login successfully on the login rout and return HTTP Status 200', async() => {
            const response = await request(api)
                .post('/login')
                .send({usarname: 'Everton', password: '123'})
                .expect(200)

            assert.deepStrictEqual(response.text, 'Logging has succeeded!')
        });

        it('should unauthorize a request when requesting in using wrong credentials and return HTTP Status 401', async() => {
            const response = await request(api)
                .post('/login')
                .send({usarname: 'Xuxa', password: '321'})
                .expect(401)

            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Logging failed!')
        });
    })
})

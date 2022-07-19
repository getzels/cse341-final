const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)
//jest.setTimeout(30000);

//create user
describe('Handler for creating a user', () => {
    test('should create a user', async () => {
        const response = await request.post('/users')
            .send({
                "firstName": "test",
                "lastName": "test",
                "email": "testing@gmail.com"
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(201)
            .expect('Content-Type', /json/);
        expect(response.body.message).toBe('New user was successfully created!');
    }
    , 30000);
}
, 30000);

//get user
describe("Handler for getting a user", () => {
    test("should get a user", async () => {
        const response = await request.get('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body.length).toBe(1);
    }
    , 30000);
}
, 30000);

//get all users
describe("Handler for getting all users", () => {
    test("should get all users", async () => {
        const response = await request.get('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body.length).toBe(1);
    }
    , 30000);
}
, 30000);

//delete user
describe("Handler for deleting a user", () => {
    test("should delete a user", async () => {
        const response = await request.delete('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body.message).toBe('User was successfully deleted!');
    }
    , 30000);
}
, 30000);

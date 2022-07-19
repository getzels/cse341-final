const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)
//jest.setTimeout(30000);

//create goal
describe('Handler for creating a reading goal', () => {
    test('should create a reading goal', async () => {
        const response = await request.post('/readingGoals')
            .send({
                "description": "test",
                "startDate": "2020-01-01",
                "endDate": "2020-01-02",
                "book": "5e8f8f8f8f8f8f8f8f8f8f"
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(201)
            .expect('Content-Type', /json/);
        expect(response.body.message).toBe('New goal was successfully created!');
    }
    , 30000);
}
, 30000);

//get user's goals
describe("Handler for getting user's reading goals", () => {
    test("should get user's reading goals", async () => {
        const response = await request.get('/readingGoals')
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

//get all goals
describe("Handler for getting all reading goals", () => {
    test("should get all reading goals", async () => {
        const response = await request.get('/readingGoals')
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

//update goal
describe("Handler for updating a reading goal", () => {
    test("should update a reading goal", async () => {
        const response = await request.put('/readingGoals/5e8f8f8f8f8f8f8f8f8f8f8')
            .send({
                "description": "test",
                "startDate": "2020-01-01",
                "endDate": "2020-01-02",
                "book": "5e8f8f8f8f8f8f8f8f8f8f"
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(201)
            .expect('Content-Type', /json/);
        expect(response.body.message).toBe('Goal was successfully updated!');
    }
    , 30000);
}
, 30000);

//delete goal
describe("Handler for deleting a reading goal", () => {
    test("should delete a reading goal", async () => {
        const response = await request.delete('/readingGoals/5e8f8f8f8f8f8f8f8f8f8f8')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + process.env.CLIENT_SECRET)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body.message).toBe('Goal was successfully deleted!');
    }
    , 30000);
}
, 30000);
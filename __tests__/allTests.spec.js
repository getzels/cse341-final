const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)
jest.setTimeout(30000);
//get all books
describe('Handler for retrieving all books', () => {
    test('responds to get /book/', async () => {
        const res = await request.get('/book');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
})})

//get one book
describe('Handler for retrieving one book', () => {
    test('responds to get /book/:_id', async () => {
        const res = await request.get('/book/62d33803ef24ec2c7b8c5292');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
})})

//create book
describe('Handler for creating a book', () => {
    test('responds to post /book', async () => {
        const res = await request.post('/book').send(    {
            name: "Book Title",
            publishDate: "2000",
            category: "novel",
            publisher: "Publishing Co.",
            type: "hardbound"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
})})

//update book
describe('Handler for updating a book', () => {
    test('responds to update /book/:_id', async () => {
        const res = await request.put('/book/62d4ba92c7dd74edea907026').send(    {
            name: "Bookish Club",
            publishDate: "2002",
            category: "novel",
            publisher: "Publishing Co.",
            type: "hardbound"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(401)
})})

//delete book
describe('Handler for deleting a book', () => {
    test('responds to update /book/:_id', async () => {
        const res = await request.delete('/book/62d4bb3dc7dd74edea907029')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(401)
})})

//GOALS

//create goal
describe('Handler for creating a reading goal', () => {
    test('should create a reading goal', async () => {
        const response = await request.post('/readingGoals')
            .send({
                description: "test",
                startDate: "2020-01-01",
                endDate: "2020-01-02",
                book: "5e8f8f8f8f8f8f8f8f8f8f"
            })
            expect(response.header['content-type']).toBe('text/html; charset=utf-8');
            expect(response.statusCode).toBe(404)
            // .set('Accept', 'application/json')
            // .set('Content-Type', 'application/json')
            // .expect(401)
            // .expect('Content-Type', /json/);
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
            .expect(401)
            .expect('Content-Type', /json/);
    }
    , 30000);
}
, 30000);


// //get all goals
describe("Handler for getting all reading goals", () => {
    test("should get all reading goals", async () => {
         const response = await request.get('/readingGoals')
             .set('Accept', 'application/json')
             .set('Content-Type', 'application/json')
             .expect(401)
             .expect('Content-Type', /json/);
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
            .expect(401)
            .expect('Content-Type', /json/);
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
            .expect(401)
            .expect('Content-Type', /json/)
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
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');
    }
    , 30000);
}
, 30000);

// //get all users
describe("Handler for getting all users", () => {
    test("should get all users", async () => {
        const response = await request.get('/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');
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
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');
    }
    , 30000);
}
, 30000);

//get directory
describe('Handler for retrieving all directory', () => {
    test('responds to get /userDirectory/', async () => {
        const res = await request.get('/userDirectory');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(404)
    })})

//create directory
describe('Handler for creating a directory/:_id', () => {
    test('should create a directory', async () => {

        const response = await request.post('/directory/116014457251554404011')
            .send({
                user: "5e8f8f8f8f8f8f8f8f8f8f",
                note: "note test",
                book: {
                    name: "Book Title",
                    publishDate: "2000",
                    category: "novel",
                    publisher: "Publishing Co.",
                    type: "hardbound"
                }
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/);
    })});

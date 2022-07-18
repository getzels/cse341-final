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


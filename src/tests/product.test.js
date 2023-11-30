const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user);
    console.log(res.body);
    token = res.body.token;
})

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /products', async () => {
    const product = {
        title: 'test title',
        description: 'test description',
        brand: 'test Brand',
        price: 1223344,
    }
    
    const res = await request(app)
    .post('/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

test('PUT /products/:id', async () => {
    const body = { title: 'test title' }
    const res = await request(app)
    .put(`/products/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title)
})

test('DELETE /products/:id', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(204);
});
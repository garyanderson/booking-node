const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "GarYSntA@gmail.com",
        password: "pesadilla12345" ,
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /reviews debe crear un review', async () => {
    const reviewsBody = {
        rating: 3.5,
        comment: "alguna daño y no olia muy bien el cuarto"
    }
    const res = await request(app)
        .post('/reviews')
        .send(reviewsBody)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.headline).toBe(reviewsBody.headline);
    expect(res.body.id).toBeDefined();
});

test('GET /reviews debe traer todos los reviews', async () => {
    const res = await request(app).get('/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GET /reviews/:id debe retornar el review seleccionado', async () => { 
    const res = await request(app).get(`/reviews/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBe(id);
 });
 
  test('PUT /reviews/:id debe actualizar el review seleccionado', async () => { 
     const updatedReview = {
        rating: 1.2,
        coment: "olia mal la habitacion",
     }
     const res = await request(app).put('/reviews/'+id).send(updatedReview).set("Authorization", `Bearer ${token}`);
     expect(res.status).toBe(200);
     expect(res.body.coment).toBe(updatedReview.comment);
   });

test('DELETE /reviews/:id debe eliminar un review', async () => {
    const res = await request(app)
        .delete('/reviews/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
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

test('POST /booking debe crear un booking', async () => {
    const bookingBody = {
        checkIn: "2024-01-20",
        checkOut: "2024-04-05"
    }
    const res = await request(app)
        .post('/booking')
        .send(bookingBody)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.headline).toBe(bookingBody.headline);
    expect(res.body.id).toBeDefined();
});

test('GET /booking debe traer todos los bookings', async () => {
    const res = await request(app).get('/booking').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GET /booking/:id debe retornar el booking seleccionado', async () => { 
    const res = await request(app).get(`/booking/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBe(id);
 });
 
  test('PUT /booking/:id debe actualizar el booking seleccionado', async () => { 
     const updatedUser = {
        checkIn: "2024-01-20",
        checkOut: "2025-04-05"
     }
     const res = await request(app).put('/booking/'+id).send(updatedUser).set("Authorization", `Bearer ${token}`);
     expect(res.status).toBe(200);
     expect(res.body.name).toBe(updatedUser.name);
   });

test('DELETE /booking/:id debe eliminar un booking', async () => {
    const res = await request(app)
        .delete('/booking/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
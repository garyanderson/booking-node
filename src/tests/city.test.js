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

test('POST /cities debe crear una ciudad', async () => {
    const citiesBody = {
        name: "santiago de Cali",
        country: "Colombia",
        countryId: "CA"
    }
    const res = await request(app)
        .post('/cities')
        .send(citiesBody)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.headline).toBe(citiesBody.headline);
    expect(res.body.id).toBeDefined();
});

test('GET /cities debe traer todas las ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GET /cities/:id debe retornar la ciudad seleccionada', async () => { 
    const res = await request(app).get(`/cities/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBe(id);
 });
 
  test('PUT /cities/:id debe actualizar la ciudad seleccionada', async () => { 
     const updatedUser = {
        name: "santiago de Cali",
        country: "Colombia",
        countryId: "CO"
     }
     const res = await request(app).put('/cities/'+id).send(updatedUser).set("Authorization", `Bearer ${token}`);
     expect(res.status).toBe(200);
     expect(res.body.name).toBe(updatedUser.name);
   });

test('DELETE /cities/:id debe eliminar una ciudad', async () => {
    const res = await request(app)
        .delete('/cities/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
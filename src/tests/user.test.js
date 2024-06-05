const request = require ('supertest');
const app = require ('../app');

let id;
let token;

test('POST /users crear usuario', async () => { 
   const newUser = {
       firstName: "danny",
       lastName: "trochez",
       email: "danytchz@gmail.com",
       password: "prima12345" ,
       gender: "male"
   }
   const res = await request(app).post('/users').send(newUser);
   id = res.body.id;
   expect(res.status).toBe(201);
   expect(res.body.id).toBeDefined();
   expect(res.body.email).toBe(newUser.email);
});

test('POST /users/login debe loggear al usuario', async () => {
   const credentials = {
       email: 'danytchz@gmail.com',
       password: 'prima12345',
   }
   const res = await request(app).post('/users/login').send(credentials);
   token = res.body.token;
   expect(res.status).toBe(200);
   expect(res.body.token).toBeDefined();
   expect(res.body.user.email).toBe(credentials.email);
});

test('GET /users mostrar todos los usuarios', async () => { 
    const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('GET /users/:id debe retornar el usuario seleccionado', async () => { 
   const res = await request(app).get(`/users/${id}`).set("Authorization", `Bearer ${token}`);
   expect(res.status).toBe(200);
   expect(res.body).toBeDefined();
   expect(res.body.id).toBe(id);
});

 test('PUT /users/:id debe actualizar el usuario seleccionado', async () => { 
    const updatedUser = {
        firstName: "alexander",
        lastName: "botina",
        email: "danytchz@gmail.com",
        gender: "male"
    }
    const res = await request(app).put('/users/'+id).send(updatedUser).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(updatedUser.email);
  });

  test('POST /users/login con credenciales incorrectas debe dar error', async () => {
   const credentials = {
       email: 'correoIncorrecto@gmail.com',
       password: 'ConTraSeniAinCorrecta',
   }
   const res = await request(app).post('/users/login').send(credentials);
   expect(res.status).toBe(401);
});

 test('DELETE /users/:id debe eliminar el usuario seleccionado', async () => {  
    const res = await request(app).delete('/users/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
 });

 

 // tb => tobbe
 //tbi => tobe instance
 // tbd => tode defined
 //thl => ToHaveLength
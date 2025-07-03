require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/database/prisma');

describe('Student Endpoints', () => {
  let adminToken;
  let studentToken;
  let studentId;

  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.student.deleteMany();

    await request(app)
      .post('/auth/register')
      .send({ username: 'admin', password: 'admin', role: 'admin' });
    await request(app)
      .post('/auth/register')
      .send({ username: 'student', password: 'student', role: 'student' });

    const adminRes = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });
    adminToken = adminRes.body.token;

    const studentRes = await request(app)
      .post('/auth/login')
      .send({ username: 'student', password: 'student' });
    studentToken = studentRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Student role cannot create student', async () => {
    const res = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ name: 'Test', email: 'test@example.com', ra: '54321', cpf: '555.666.777-88' });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });

  test('Student role cannot update student', async () => {
    const res = await request(app)
      .put('/students/1')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ name: 'Modified' });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });

  test('Student role cannot delete student', async () => {
    const res = await request(app)
      .delete('/students/1')
      .set('Authorization', `Bearer ${studentToken}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });

  test('Admin can create student', async () => {
    const res = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'John Doe', email: 'john@example.com', ra: '12345', cpf: '111.222.333-44' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
    studentId = res.body.id;
  });

  test('Admin can get all students', async () => {
    const res = await request(app)
      .get('/students')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Admin can get student by id', async () => {
    const res = await request(app)
      .get(`/students/${studentId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(studentId);
  });

  test('Get by id non-existing returns 404', async () => {
    const res = await request(app)
      .get('/students/9999')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Student not found');
  });

  test('Admin can update student', async () => {
    const res = await request(app)
      .put(`/students/${studentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Jane Doe' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  test('Admin can delete student', async () => {
    const res = await request(app)
      .delete(`/students/${studentId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(204);
  });

  test('Deleted student is no longer available', async () => {
    const res = await request(app)
      .get(`/students/${studentId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });
});
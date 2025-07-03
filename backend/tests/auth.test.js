require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/database/prisma');

describe('Auth Endpoints', () => {
  const username = 'user1';
  const password = 'pass1';

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username, password, role: 'student' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe(username);
    expect(res.body.role).toBe('student');
    expect(res.body.password).not.toBe(password);
  });

  test('Registering with existing username should fail', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username, password, role: 'student' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Login with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login with wrong password fails', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username, password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  test('Login with non-existent user fails', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'nouser', password: 'pass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('User not found');
  });
});
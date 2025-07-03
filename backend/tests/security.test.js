const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/database/prisma");

let studentToken, adminToken;

beforeAll(async () => {
  // Limpar e criar usuários
  await prisma.user.deleteMany();
  await prisma.student.deleteMany();

  await request(app).post("/auth/register").send({
    username: "admin2",
    password: "admin123",
    role: "admin",
  });

  await request(app).post("/auth/register").send({
    username: "student2",
    password: "student123",
    role: "student",
  });

  const adminLogin = await request(app).post("/auth/login").send({
    username: "admin2",
    password: "admin123",
  });

  adminToken = adminLogin.body.token;

  const studentLogin = await request(app).post("/auth/login").send({
    username: "student2",
    password: "student123",
  });

  studentToken = studentLogin.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Security and Access Control", () => {
  test("Student cannot create a student", async () => {
    const res = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        name: "Maria Estudante",
        email: "student@email.com",
        ra: "2025999",
        cpf: "987.654.321-00",
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Access denied");
  });

  test("Accessing protected route without token returns 401", async () => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Token missing");
  });

  test("Accessing with invalid token returns 403", async () => {
    const res = await request(app)
      .get("/students")
      .set("Authorization", "Bearer INVALID_TOKEN");

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Invalid token");
  });

  test("Admin can access protected route", async () => {
    const res = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

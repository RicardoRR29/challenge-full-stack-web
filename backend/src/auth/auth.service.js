const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../database/prisma");

const service = {
  async register({ username, password, role = "student" }) {
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      throw new Error("Username already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        username,
        password: hashed,
        role,
      },
    });
  },

  async login({ username, password }) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return { token, role: user.role };
  },
};

module.exports = service;

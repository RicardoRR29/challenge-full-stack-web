const prisma = require("../database/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const service = {
  async register({ username, password, role = "student" }) {
    const hashed = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { username, password: hashed, role },
    });
  },

  async login({ username, password }) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
};

module.exports = service;


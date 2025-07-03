const prisma = require("../database/prisma");

const studentService = {
  getAll: async () => await prisma.student.findMany(),

  getById: async (id) =>
    await prisma.student.findUnique({ where: { id: Number(id) } }),

  create: async (data) => await prisma.student.create({ data }),

  update: async (id, data) =>
    await prisma.student.update({ where: { id: Number(id) }, data }),

  remove: async (id) =>
    await prisma.student.delete({ where: { id: Number(id) } }),
};

module.exports = studentService;


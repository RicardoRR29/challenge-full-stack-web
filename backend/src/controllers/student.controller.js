const studentService = require("../services/student.service");

const studentController = {
  async getAll(req, res) {
    const students = await studentService.getAll();
    res.json(students);
  },

  async getById(req, res) {
    const student = await studentService.getById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  },

  async create(req, res) {
    const student = await studentService.create(req.body);
    res.status(201).json(student);
  },

  async update(req, res) {
    const student = await studentService.update(req.params.id, req.body);
    res.json(student);
  },

  async remove(req, res) {
    await studentService.remove(req.params.id);
    res.status(204).send();
  },
};

module.exports = studentController;

const service = require("./auth.service");

const controller = {
  async register(req, res) {
    try {
      const admin = await service.register(req.body);
      res.status(201).json(admin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { token, role } = await service.login(req.body);
      res.json({ token, role });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};

module.exports = controller;

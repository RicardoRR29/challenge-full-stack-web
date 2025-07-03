const express = require("express");
const controller = require("../controllers/student.controller");
const auth = require("../auth/auth.middleware");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.use(auth); // protege todas as rotas com autenticação

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// protege apenas as rotas que precisam de admin
router.post("/", isAdmin, controller.create);
router.put("/:id", isAdmin, controller.update);
router.delete("/:id", isAdmin, controller.remove);

module.exports = router;

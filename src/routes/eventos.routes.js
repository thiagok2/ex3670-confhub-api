const { Router } = require("express");
const controller = require("../controllers/eventos.controller");

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.detalhar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;

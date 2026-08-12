const { Router } = require("express");
const controller = require("../controllers/eventos.controller");
const { autenticar } = require("../middlewares/autenticar");

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.detalhar);
router.post("/", autenticar, controller.criar);
router.put("/:id", autenticar, controller.atualizar);
router.delete("/:id", autenticar, controller.remover);

module.exports = router;

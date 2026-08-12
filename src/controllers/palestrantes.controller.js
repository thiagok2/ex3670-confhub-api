const db = require("../data/db");

// GET /palestrantes?area=...
function listar(req, res) {
  let resultado = db.palestrantes;
  if (req.query.area) {
    const area = String(req.query.area).toLowerCase();
    resultado = resultado.filter((p) => p.area.toLowerCase().includes(area));
  }
  res.json(resultado);
}

// GET /palestrantes/:id
function detalhar(req, res) {
  const palestrante = db.palestrantes.find((p) => p.id === Number(req.params.id));
  if (!palestrante) return res.status(404).json({ erro: "Palestrante não encontrado" });
  const eventos = db.eventos.filter((e) => e.palestranteId === palestrante.id);
  res.json({ ...palestrante, eventos });
}

module.exports = { listar, detalhar };

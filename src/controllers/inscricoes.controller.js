const db = require("../data/db");

// GET /inscricoes?eventoId=...
function listar(req, res) {
  let resultado = db.inscricoes;
  if (req.query.eventoId) {
    resultado = resultado.filter((i) => i.eventoId === Number(req.query.eventoId));
  }
  res.json(resultado);
}

// POST /inscricoes
function criar(req, res) {
  const { eventoId, participante, email } = req.body || {};
  if (!eventoId || !participante || !email) {
    return res.status(400).json({ erro: "Campos obrigatórios: eventoId, participante, email" });
  }
  const evento = db.eventos.find((e) => e.id === Number(eventoId));
  if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });

  const ocupadas = db.inscricoes.filter((i) => i.eventoId === evento.id).length;
  if (ocupadas >= evento.vagas) {
    return res.status(409).json({ erro: "Evento lotado" });
  }

  const inscricao = {
    id: db.proximoId(db.inscricoes),
    eventoId: evento.id,
    participante,
    email,
    criadaEm: new Date().toISOString().slice(0, 10),
  };
  db.inscricoes.push(inscricao);
  res.status(201).json(inscricao);
}

module.exports = { listar, criar };

const db = require("../data/db");

function vagasRestantes(evento) {
  const ocupadas = db.inscricoes.filter((i) => i.eventoId === evento.id).length;
  return evento.vagas - ocupadas;
}

// GET /eventos?cidade=...&disponiveis=true
function listar(req, res) {
  let resultado = db.eventos;

  if (req.query.cidade) {
    const cidade = String(req.query.cidade).toLowerCase();
    resultado = resultado.filter((e) => e.cidade.toLowerCase() === cidade);
  }

  if (req.query.disponiveis === "true") {
    resultado = resultado.filter((e) => vagasRestantes(e) > 0);
  }

  res.json(resultado.map((e) => ({ ...e, vagasRestantes: vagasRestantes(e) })));
}

// GET /eventos/:id
function detalhar(req, res) {
  const evento = db.eventos.find((e) => e.id === Number(req.params.id));
  if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });
  const palestrante = db.palestrantes.find((p) => p.id === evento.palestranteId);
  res.json({ ...evento, vagasRestantes: vagasRestantes(evento), palestrante });
}

// POST /eventos
function criar(req, res) {
  const { titulo, descricao, cidade, data, vagas, palestranteId } = req.body || {};
  if (!titulo || !cidade || !data || !vagas) {
    return res.status(400).json({ erro: "Campos obrigatórios: titulo, cidade, data, vagas" });
  }
  const evento = {
    id: db.proximoId(db.eventos),
    titulo,
    descricao: descricao || "",
    cidade,
    data,
    vagas: Number(vagas),
    palestranteId: palestranteId ? Number(palestranteId) : null,
  };
  db.eventos.push(evento);
  res.status(201).json(evento);
}

// PUT /eventos/:id
function atualizar(req, res) {
  const evento = db.eventos.find((e) => e.id === Number(req.params.id));
  if (!evento) return res.status(404).json({ erro: "Evento não encontrado" });
  const { titulo, descricao, cidade, data, vagas } = req.body || {};
  if (titulo !== undefined) evento.titulo = titulo;
  if (descricao !== undefined) evento.descricao = descricao;
  if (cidade !== undefined) evento.cidade = cidade;
  if (data !== undefined) evento.data = data;
  if (vagas !== undefined) evento.vagas = Number(vagas);
  res.json(evento);
}

// DELETE /eventos/:id
function remover(req, res) {
  const indice = db.eventos.findIndex((e) => e.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ erro: "Evento não encontrado" });
  db.eventos.splice(indice, 1);
  res.status(204).end();
}

module.exports = { listar, detalhar, criar, atualizar, remover };

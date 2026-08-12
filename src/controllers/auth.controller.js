const jwt = require("jsonwebtoken");
const db = require("../data/db");
const { SEGREDO } = require("../middlewares/autenticar");

// POST /auth/login  { email, senha }
function login(req, res) {
  const { email, senha } = req.body || {};
  const usuario = db.usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

  const token = jwt.sign(
    { sub: usuario.id, nome: usuario.nome, papel: usuario.papel },
    SEGREDO,
    { algorithm: "HS256", expiresIn: "2h" },
  );
  res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, papel: usuario.papel } });
}

module.exports = { login };

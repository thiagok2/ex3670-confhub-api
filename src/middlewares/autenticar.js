const jwt = require("jsonwebtoken");

const SEGREDO = process.env.JWT_SECRET || "confhub-dev";

// Middleware de autenticação JWT.
// Uso: router.post("/", autenticar, controller.criar)
function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || "";
  const token = cabecalho.startsWith("Bearer ") ? cabecalho.slice(7) : null;
  if (!token) return res.status(401).json({ erro: "Token ausente" });
  try {
    req.usuario = jwt.verify(token, SEGREDO, { algorithms: ["HS256"] });
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = { autenticar, SEGREDO };

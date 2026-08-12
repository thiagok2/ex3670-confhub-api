// Tratamento global de erros: nunca vazar stack trace para o cliente.
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
};

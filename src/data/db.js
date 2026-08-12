// "Banco de dados" em memória, carregado dos seeds.
// Em produção seria um banco relacional; aqui mantemos o foco na API.
const eventos = require("./seeds/eventos.json");
const palestrantes = require("./seeds/palestrantes.json");
const inscricoes = require("./seeds/inscricoes.json");
const usuarios = require("./seeds/usuarios.json");

module.exports = {
  eventos: [...eventos],
  palestrantes: [...palestrantes],
  inscricoes: [...inscricoes],
  usuarios: [...usuarios],
  proximoId(colecao) {
    return colecao.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  },
};

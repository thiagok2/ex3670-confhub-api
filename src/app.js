const express = require("express");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const authRoutes = require("./routes/auth.routes");
const eventosRoutes = require("./routes/eventos.routes");
const palestrantesRoutes = require("./routes/palestrantes.routes");
const inscricoesRoutes = require("./routes/inscricoes.routes");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    nome: "ConfHub API",
    versao: "1.4.2",
    recursos: ["/auth/login", "/eventos", "/palestrantes", "/inscricoes"],
  });
});

app.use("/auth", authRoutes);
app.use("/eventos", eventosRoutes);
app.use("/palestrantes", palestrantesRoutes);
app.use("/inscricoes", inscricoesRoutes);

app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada" }));
app.use(errorHandler);

module.exports = app;

# ConfHub API

Backend REST de gestão de eventos acadêmicos: eventos, palestrantes, inscrições e
autenticação de organizadores. Sistema em produção desde 2024 na organização de
semanas acadêmicas e workshops.

## Stack

- Node.js 20+ · Express 4
- Autenticação via JWT (`jsonwebtoken`)
- Persistência em memória com seeds (ambiente de desenvolvimento)

## Como rodar

```bash
npm install
npm start           # http://localhost:3000
```

## Arquitetura

```
src/
  server.js               # bootstrap
  app.js                  # app Express, middlewares e montagem das rotas
  routes/                 # definição das rotas de cada recurso
  controllers/            # regra de negócio de cada recurso
  middlewares/            # logger, tratamento de erros, autenticação JWT
  data/
    db.js                 # "banco" em memória
    seeds/                # dados de desenvolvimento (eventos, inscrições, ...)
```

## Recursos

| Método | Rota                | Descrição                                    |
|--------|---------------------|----------------------------------------------|
| POST   | `/auth/login`       | Autentica organizador e devolve token JWT    |
| GET    | `/eventos`          | Lista eventos (`?cidade=`, `?disponiveis=true`) |
| GET    | `/eventos/:id`      | Detalha evento com palestrante e vagas       |
| POST   | `/eventos`          | Cria evento                                  |
| PUT    | `/eventos/:id`      | Atualiza evento                              |
| DELETE | `/eventos/:id`      | Remove evento                                |
| GET    | `/palestrantes`     | Lista palestrantes (`?area=`)                |
| GET    | `/palestrantes/:id` | Detalha palestrante com seus eventos         |
| GET    | `/inscricoes`       | Lista inscrições (`?eventoId=`)              |
| POST   | `/inscricoes`       | Inscreve participante (respeita lotação)     |

## Credenciais de desenvolvimento

| E-mail                   | Senha      | Papel        |
|--------------------------|------------|--------------|
| `ana.lima@confhub.dev`   | `ifal2026` | organizadora |
| `bruno.costa@confhub.dev`| `ifal2026` | organizador  |

## Notas de versão

- **1.4.2** — correções no cálculo de vagas exibido no detalhe do evento.
- **1.4.0** — filtro de eventos por cidade e disponibilidade.
- **1.3.0** — middleware de autenticação JWT (`src/middlewares/autenticar.js`).

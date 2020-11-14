// Requirements
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Initializations
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use(require("./routes/areas.routes"));
app.use(require("./routes/categorias.routes"));
app.use(require("./routes/subcategorias.routes"));
app.use(require("./routes/productos.routes"));
app.use(require("./routes/clientes.routes"));
app.use(require("./routes/operadores.routes"));
app.use(require("./routes/logs.routes"));
app.use(require("./routes/cuentas.routes"));
app.use(require("./routes/cajas.routes"));

module.exports = app;

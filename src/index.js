// Requirements
const app = require("./app");
const { createConnection } = require("./database");

createConnection();
app.listen(3001);
console.log("Servidor iniciado");


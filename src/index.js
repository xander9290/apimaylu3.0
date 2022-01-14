// Requirements
const app = require("./app");
const { createConnection } = require("./database");
const open = require("open");

// Port
app.set("port", 3001);

createConnection();
app.listen(app.get("port"));
console.log(
  ">Servidor iniciado en puerto: ",
  app.get("port"),
  "\n>Iniciando applicacion."
);
(async () => {
  await open(`http://localhost:${app.get("port")}`);
})();

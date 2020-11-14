const { Router } = require("express");
const router = Router();
const { getConnection } = require("../database");
const { v4 } = require("uuid");

router.post("/clientes", (req, res) => {
  const newCliente = {
    ...req.body,
    id: v4(),
  };
  getConnection().get("clientes").push(newCliente).write();
  res.json(newCliente);
});

router.get("/clientes", (req, res) => {
  const clientes = getConnection().get("clientes").sortBy("name").value();
  res.json(clientes);
});

router.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getConnection()
    .get("clientes")
    .find({ id })
    .assign(req.body)
    .write();
  res.json(result);
});

router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  getConnection().get("clientes").remove({ id }).write();
  res.json({ success: true });
});

module.exports = router;

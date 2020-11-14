const { Router } = require("express");
const router = Router();
const { getConnection } = require("../database");
const { v4 } = require("uuid");

router.post("/operadores", (req, res) => {
  const newOperador = {
    ...req.body,
    id: v4(),
  };
  getConnection().get("operadores").push(newOperador).write();
  res.json(newOperador);
});

router.get("/operadores", (req, res) => {
  const operadores = getConnection().get("operadores").sortBy("id").value();
  res.json(operadores);
});

router.put("/operadores/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getConnection()
    .get("operadores")
    .find({ id })
    .assign(req.body)
    .write();
  res.json(result);
});

router.delete("/operadores/:id", (req, res) => {
  const { id } = req.params;
  getConnection().get("operadores").remove({ id }).write();
  res.json({ success: true });
});

module.exports = router;

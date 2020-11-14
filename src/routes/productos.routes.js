const { Router } = require("express");
const router = Router();
const { getConnection } = require("../database");
const { v4 } = require("uuid");

router.post("/productos", (req, res) => {
  const newProducto = {
    ...req.body,
    id: v4(),
  };
  getConnection().get("productos").push(newProducto).write();
  res.json(newProducto);
});

router.get("/productos", (req, res) => {
  const productos = getConnection().get("productos").sortBy("subcategoria_id").value();
  res.json(productos);
});

router.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getConnection()
    .get("productos")
    .find({ id })
    .assign(req.body)
    .write();
  res.json(result);
});

router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  getConnection().get("productos").remove({ id }).write();
  res.json({ success: true });
});

module.exports = router;

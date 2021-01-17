const { Router } = require("express");
const router = Router();
const { getConnection } = require("../database");
const { v4 } = require("uuid");

router.post("/cuentas", (req, res) => {
  const newCuenta = {
    ...req.body,
    id: v4(),
  };
  getConnection().get("cuentas").push(newCuenta).write();
  res.json(newCuenta);
});

router.get("/cuentas", (req, res) => {
  const cuentas = getConnection().get("cuentas").value();
  res.json(cuentas);
});

router.get("/cuentas/:id", (req, res) => {
  const { id } = req.params;
  const cuenta = getConnection().get("cuentas").find({ id }).value();
  res.json(cuenta);
});

router.get("/cuentas/abierto/:fecha", (req, res) => {
  const { fecha } = req.params;
  const cuentas = getConnection()
    .get("cuentas")
    .sortBy("orden")
    .filter({ estado: "abierto" })
    .filter({ fecha })
    .value();
  res.json(cuentas);
});

router.get("/cuentas/cerrado/:fecha", (req, res) => {
  const { fecha } = req.params;
  const cuentas = getConnection()
    .get("cuentas")
    .sortBy("orden")
    .filter({ fecha })
    .value();
  res.json(cuentas);
});

router.put("/cuentas/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getConnection()
    .get("cuentas")
    .find({ id })
    .assign(req.body)
    .write();
  res.json(result);
});

module.exports = router;

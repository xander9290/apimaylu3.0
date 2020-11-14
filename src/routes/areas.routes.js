// Requirements
const { Router } = require("express");
const router = Router();
const { getConnection } = require("../database");
const { v4 } = require("uuid");

router.post("/areas", (req, res) => {
  const newArea = {
    ...req.body,
    id: v4(),
  };
  getConnection().get("areas").push(newArea).write();
  res.json(newArea);
});

router.get("/areas", (req, res) => {
    const areas = getConnection().get("areas").value();
    res.json(areas);
  });

router.delete("/areas/:id", (req, res) => {
    const { id } = req.params;
    getConnection().get("areas").remove({ id }).write();
    res.json({ success: true });
});

module.exports = router;

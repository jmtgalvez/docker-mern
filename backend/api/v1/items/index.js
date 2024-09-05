const router = require("express").Router();
const CTRL = require("./controller");

// GET /items
router.get("/", async (req, res) => {
  const items = await CTRL.getItems();
  res.json({
    status: 200,
    message: "Successfully retrieved items",
    items,
  });
});

// POST /items
router.post("/", async (req, res) => {
  let { title, body } = req.body;
  const item = await CTRL.newItem({ title, body });
  res.json({
    status: 200,
    message: "Successfully added new item",
    item,
  });
});

// PUT /items/:id
router.put("/:id", async (req, res) => {
  let { title, body } = req.body;
  let data = {
    id: req.params.id,
    title,
    body,
  };
  const item = await CTRL.editItem(data);
  res.json({
    status: 200,
    message: "Succesfully edited item",
    item,
  });
});

// DELETE /items/:id
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await CTRL.delItem({ id });
  res.json({
    status: 200,
    message: "Successfully deleted item",
  });
});

module.exports = router;

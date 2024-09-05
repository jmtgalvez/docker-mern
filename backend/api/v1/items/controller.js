const Item = require("../../../utils/models/Item");

exports.newItem = async ({ title, body }) => {
  const item = await Item.create({ title, body });
  return item;
};

exports.getItems = async () => {
  const items = Item.find();
  return items;
};

exports.editItem = async ({ id, title, body }) => {
  const item = await Item.findByIdAndUpdate(id, { title, body });
  return item;
};

exports.delItem = async ({ id }) => {
  await Item.findByIdAndDelete(id);
  return;
};

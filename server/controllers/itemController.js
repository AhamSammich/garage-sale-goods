const Item = require("../models/itemModel");
const mongoose = require("mongoose");

// get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAtt: -1 }); // descending order
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get a single item
const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Item not found." });
    }

    const item = await Item.findById(id); // descending order

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// create new item
const createItem = async (req, res) => {
  // add doc to db
  try {
    const item = await Item.create({
      ...req.body
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete an item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Item not found." });
    }
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update an item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Item not found." });
    }
    const item = await Item.findByIdAndUpdate(id, {
        ...req.body
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
};

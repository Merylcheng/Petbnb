const Sitter = require("../../models/sitter");

//CREATE A NEW SITTER
const create = async (req, res) => {
  try {
    const body = req.body;
    if (req.file) {
      body.imageUrl = req.file.path;
    }
    const sitter = await Sitter.create(body);
    res.status(201).json(sitter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SEE ALL SITTERS (FEATURED LISTING)
const getAll = async (req, res) => {
  const sitters = await Sitter.find({});
  res.json(sitters);
};

//FIND SITTER BY ID
const getSitterById = async (req, res) => {
  try {
    const sitter = await Sitter.findById(req.params.id);
    if (!sitter) {
      return res.status(404).json({ message: "Sitter not found" });
    }
    res.status(200).json(sitter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE SITTER BY ID
const deleteById = async (req, res) => {
  try {
    const sitter = await Sitter.findByIdAndDelete(req.params.id);
    if (!sitter) {
      return res.status(404).json({ message: "Sitter not found" });
    }
    res.status(200).json({ message: "Sitter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getSitterById,
  deleteById,
};
const Sitter = require("../../models/sitter");

// CREATE A NEW SITTER
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

//

module.exports = {
  create,
  getAll,
  getSitterById,
};

// const search = async (req, res) => {
//   try {
//     let query = {};
//     if (req.query.location) {
//       query.location = req.query.location.trim();
//       console.log(`Search location: ${query.location}`);
//     }
//     const sitters = await Sitter.find(query);
//     res.json(sitters);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// deleteById,
// DELETE SITTER BY ID
// const deleteById = async (req, res) => {
//   try {
//     const sitter = await Sitter.findByIdAndDelete(req.params.id);
//     if (!sitter) {
//       return res.status(404).json({ message: "Sitter not found" });
//     }
//     res.status(200).json({ message: "Sitter deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

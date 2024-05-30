// const express = require("express");
// const router = express.Router();
const Sitter = require("../../models/sitter");

//CREATE A NEW SITTER
const create = async (req, res) => {
  const body = req.body;
  //taking whatever it received, dig into data, grabbin the body
  const sitter = await Sitter.create(body);
  res.status(201).json(sitter); //return what you created
};

//SEE ALL PROPERTIES
const getAll = async (req, res) => {
  const sitters = await Sitter.find({});
  res.json(sitters);
};

module.exports = {
  create,
  getAll,
};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sitterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
    },
    pet: {
      type: String,
      required: true,
    },
    petSize: {
      type: String,
      required: true,
      enum: ["Small", "Medium", "Large"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sitter", sitterSchema);

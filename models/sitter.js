// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const sitterSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     contact: {
//       type: Number,
//       required: true,
//     },

//     bio: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: String,
//       required: true,
//     },
//     charges: {
//       type: Number,
//       required: true,
//     },
//     pet: {
//       type: String,
//       required: true,
//       enum: ["Dog", "Cat", "Small Animals"],
//     },
//     petSize: {
//       type: String,
//       required: true,
//       enum: ["Small", "Medium", "Large"],
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Sitter", sitterSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sitterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
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
      type: [
        {
          type: String,
          enum: ["Dog", "Cat", "Small Animals"],
          required: true,
        },
      ],
      required: true,
    },
    petSize: {
      type: [
        {
          type: String,
          required: true,
          enum: ["Small", "Medium", "Large"],
        },
      ],
      required: true,
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

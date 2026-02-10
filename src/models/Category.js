const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["select", "checkbox", "range"],
      required: true
    },
    options: {
      type: [String],
      default: []
    }
  },
  { _id: false }
);

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },

    filters: {
      type: [FilterSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', CategorySchema);

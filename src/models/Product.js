const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    name: {
      type: String,
      required: true
    },

    basePrice: {
      type: Number,
      required: true
    },

    images: {
      type: [String],
      default: []
    },

    variants:[{
        sku: String,

        attributes: {
        type: Map,
        of: String
        // examples:
        // { size: "M", gender: "female" }
        // { storage: "128GB", color: "black" }
        },

        stock: Number,
        price: Number
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);

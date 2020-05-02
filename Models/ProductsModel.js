const mongoose = require("mongoose");
const Joi = require("joi");

const ProductForm = mongoose.model(
  "Products",
  new mongoose.Schema({
    ProductName: {
      type: String,
      required: true,
    },
    Categorey: {
      type: String,
      enum: [
        "Snacks",
        "Jucies",
        "Powder",
        "Cereals & Spices",
        "Stationaries",
        "Vegetables",
      ],
      required: true,
    },
    CostPrice: {
      type: Number,
      required: true,
    },
    SellingPrice: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Units: {
      type: String,
      enum: ["Grams", "Kilograms", "Liter", "product"],
      required: true,
    },
  })
);

function ValidateProduct(product) {
  const Schema = {
    ProductName: Joi.string().required(),
    Categorey: Joi.string().required(),
    CostPrice: Joi.number().required(),
    SellingPrice: Joi.number().required(),
    Quantity: Joi.number().required(),
    Units: Joi.string().required(),
  };
  return Joi.validate(product, Schema);
}

exports.ProductForm = ProductForm;
exports.ValidateProduct = ValidateProduct;

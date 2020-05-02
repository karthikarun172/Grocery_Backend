const express = require("express");
const router = express.Router();
const { ProductForm, ValidateProduct } = require("../Models/ProductsModel");
const _ = require("lodash");

router.get("/:_id", async (req, res) => {
  const product = await ProductForm.findById(req.params._id);
  res.send(product);
});

router.get("/", async (req, res) => {
  const product = await ProductForm.find().sort("ProductName");
  res.send(product);
});

router.post("/", async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new ProductForm(
    _.pick(req.body, [
      "ProductName",
      "Categorey",
      "CostPrice",
      "SellingPrice",
      "Quantity",
      "Units",
    ])
  );
  product = await product.save();
  res.send(product);
});

router.put("/:_id", async (req, res) => {
  const { error } = ValidateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await ProductForm.findByIdAndUpdate(
    req.params._id,
    _.pick(req.body, [
      "ProductName",
      "Categorey",
      "CostPrice",
      "SellingPrice",
      "Quantity",
      "Units",
    ]),
    {
      new: true,
    }
  );
  if (!product)
    return res.status(400).send("the product with given id is not found");
  res.send(product);
});

router.delete("/:_id", async (req, res) => {
  let product = await ProductForm.findByIdAndRemove(req.params._id);
  if (!product) return res.status(400).send("this is already been deleted");

  res.send(product);
});

module.exports = router;

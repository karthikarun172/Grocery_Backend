const express = require("express");
const router = express.Router();
const { ValidateForm, RegisterForm } = require("../Models/RegisterModel");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const register = await RegisterForm.find().sort("Username");
  res.send(register);
});

router.post("/", async (req, res) => {
  const { error } = ValidateForm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let register = await RegisterForm.findOne({ Phone: req.body.Phone });
  if (register) return res.status(400).send("already Registed");

  register = new RegisterForm(
    _.pick(req.body, ["Username", "Phone", "Password"])
  );

  const salt = await bcrypt.genSalt(10);
  register.Password = await bcrypt.hash(register.Password, salt);

  register = await register.save();
  const token = register.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(register, ["_id", "Username", "Phone"]));
});

module.exports = router;

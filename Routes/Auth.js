const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { RegisterForm } = require("../Models/RegisterModel");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = VaidateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const register = await RegisterForm.findOne({ Phone: req.body.Phone });
  if (!register)
    return res.status(400).send("Invalid Phone Number or Password");

  const validatePassword = await bcrypt.compare(
    req.body.Password,
    register.Password
  );
  if (!validatePassword)
    return res.status(400).send("Invalid Phone Number or Password");

  const token = register.generateAuthToken();
  res.send(token);
});

function VaidateAuth(user) {
  const schema = {
    Phone: Joi.number().required(),
    Password: Joi.string().min(3).max(100).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;

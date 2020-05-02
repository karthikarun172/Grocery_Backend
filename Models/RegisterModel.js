const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const RegisterSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
});

RegisterSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const RegisterForm = mongoose.model("Register", RegisterSchema);

function ValidateForm(form) {
  const shcema = {
    Username: Joi.string().required(),
    Phone: Joi.number().required(),
    Password: Joi.string().required(),
  };

  return Joi.validate(form, shcema);
}

exports.RegisterForm = RegisterForm;
exports.ValidateForm = ValidateForm;

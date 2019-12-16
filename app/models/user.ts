import * as mongoose from "mongoose";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import * as Joi from "joi";
export const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "id is required"
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  usertype: Number,
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  isactive: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, id: this.id, usertype: this.usertype },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    usertype: Joi.number().required()
  };

  return Joi.validate(user, schema);
}

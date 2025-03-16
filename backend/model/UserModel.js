const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { UserSchema } = require("../schemas/UserSchema");

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password) {
    return next(new Error("Password is required"));
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };

// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Kullanıcı şeması
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,          // aynı email bir daha kaydedilemez
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }       // createdAt, updatedAt otomatik eklenir
);

// Kullanıcıyı JSON dönerken şifreyi gizle
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// Save'den önce şifreyi otomatik hashle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifreyi karşılaştırmak için yardımcı metod
userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
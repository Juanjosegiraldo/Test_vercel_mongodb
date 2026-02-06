const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
  
});

// "User" → users (mongoose lo pluraliza)
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const recipe = new mongoose.Schema({
  name: String,
  id: Number,
  minutes: Number,
  contributor_id: Number,
  submitted: Date,
  tags: [String],
  nutrition: {
    calories: Number,
    fat: Number,
    sugar: Number,
    sodium: Number,
    protein: Number,
    saturated_fat: Number,
    carbohydrates: Number,
  },
  n_steps: Number,
  steps: [String],
  description: String,
  ingredients: [String],
  n_ingredients: Number,
});

const idea = mongoose.model("recipe", recipe);

module.exports = idea;

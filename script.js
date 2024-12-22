const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const connectToDB = require("./connect");

const storeImagesFromCSV = async () => {
  const db = connectToDB();
  const results = [];

  fs.createReadStream("RAW_recipes.csv")
    .pipe(csv())
    .on("data", (data) => {
      console.log("pushing data...");
      results.push({
        name: data.name,
        id: data.id,
        minutes: data.minutes,
        contributor_id: data.contributor_id,
        submitted: data.submitted,
        tags: data.tags,
        nutrition: {
          calories: data.nutrition.calories,
          fat: data.nutrition.fat,
          sugar: data.nutrition.sugar,
          sodium: data.nutrition.sodium,
          protein: data.nutrition.protein,
          saturated_fat: data.nutrition.saturated_fat,
          carbohydrates: data.nutrition.carbohydrates,
        },
        n_steps: data.n_steps,
        steps: data.steps,
        description: data.description,
        ingredients: data.ingredients,
        n_ingredients: data.n_ingredients,
      });
    })
    .on("end", async () => {
      try {
        console.log("now to db...");
        await db.idea.insertMany(results);
        console.log("Data successfully inserted into MongoDB.");
      } catch (err) {
        console.log("Error inserting data into MongoDB:", err);
      } finally {
        mongoose.connection.close();
      }
    });
};

storeImagesFromCSV();

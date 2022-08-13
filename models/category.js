const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CategorySchema = new Schema(
    {
        title : String
   },
   {
    collection: "category"
   }
);

module.exports = mongoose.model("Category", CategorySchema);
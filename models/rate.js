const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RateSchema = new Schema(
    {
        ratingOutOfFive : Number,
        comment : String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
   },
   {
    collection: "rate"
   }
);

module.exports = mongoose.model("Rate", RateSchema);
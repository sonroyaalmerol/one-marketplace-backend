const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answerSchema = new Schema(
    {
        content: String,
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: false
        }
   },
   {
    collection: "Answer"
   }
);

module.exports = mongoose.model("Answer", answerSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let questionSchema = new Schema(
    {
        content: String,
        answer: {
            type: Schema.Types.ObjectId,
            ref: "Answer",
            required: false
        }
   },
   {
    collection: "Question"
   }
);

module.exports = mongoose.model("Question", questionSchema);
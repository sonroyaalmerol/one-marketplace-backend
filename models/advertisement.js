const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adSchema = new Schema(
    {
        title : String,
        description : String,
        location : String,
        price: Number,
        expiresAt: Date,
        disabled: {
            type: Boolean,
            default: false
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
   },
   {
    collection: "Advertisement"
   }
);

adSchema.index({
    title: 'text',
    description: 'text',
    location: 'text'
});

module.exports = mongoose.model("Advertisement", adSchema);
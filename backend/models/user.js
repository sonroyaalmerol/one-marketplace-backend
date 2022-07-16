const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        conatctno : String,
        email : String,
        name :String,
        password : String,
        username : String,
        advertisement : [{
            type : Schema.Types.ObjectId,
            ref : "Advertisement"
        }]
    },
    {
        collections : "User"
    }
);

module.exports = mongoose.model("User" , userSchema);
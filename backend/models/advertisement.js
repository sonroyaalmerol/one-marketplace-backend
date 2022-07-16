const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let addSchema = new Schema(
    {
        title : String,
        description : String,
        location : String,
        price : String,
        User  :{
            type:Schema.Types.ObjectId,
            ref: "User"
        }
   },

   {
    collections : "Advertisement"
   }
);

module.exports =mongoose.model("Advertisement",addSchema);
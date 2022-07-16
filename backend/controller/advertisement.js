const { render } = require('ejs');

let AddModel = require('../models/advertisement');

module.exports.AddList = function(req,re,next)
{
    AddModel.find((err, AddList) => 
    {
        if(err)
        {
            return console.error(err);
        }

        else
        {
            console.log(AddList);
        }
    });
}


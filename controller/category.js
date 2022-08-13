const Category = require('../models/category');

module.exports.getAllCategories = function(req,res,next)
{
    Category.find((err, categories) => 
    {
        if(err)
        {
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(categories);
        }
    });
}

module.exports.getCategory = (req, res, next) => {
    let id = req.params.id;

    Category.findById(id, (err, category) =>{

        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else {
            res.status(200).json(category);
        }

    });

}

module.exports.editCategory = (req, res, next) => {
    let id = req.params.id;

    Category.findByIdAndUpdate(id, {
        title: req.body.title
    }, (err, category) =>{
        if(err)
        {
            res.status(500).json({ error: err });
            console.log(err);
        }
        else 
        {
            res.status(200).json(category);
        }
    });
}

module.exports.addCategory = (req, res, next) => {
    Category.create({
        title: req.body.title
    }).then((category) => {
        res.status(200).json(category);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

module.exports.deleteCategory = (req, res, next) => {
    
    let id = req.params.id;

    Category.findByIdAndDelete(id, (err, category) => {
        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(category);
        }
    });
}

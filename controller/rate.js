const Rating = require('../models/rate');

module.exports.getAllRatings = function(req,res,next)
{
    Rating.find((err, rates) => 
    {
        if(err)
        {
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(rates);
        }
    });
}

module.exports.getRating = (req, res, next) => {
    let id = req.params.id;

    Rating.findById(id, (err, rate) =>{

        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else {
            res.status(200).json(rate);
        }

    });

}

module.exports.editRating = (req, res, next) => {
    let id = req.params.id;

    Rating.findByIdAndUpdate(id, {
        ratingOutOfFive: req.body.ratingOutOfFive,
        comment: req.body.comment
    }, (err, rate) =>{
        if(err)
        {
            res.status(500).json({ error: err });
            console.log(err);
        }
        else 
        {
            res.status(200).json(rate);
        }
    });
}

module.exports.addRating = (req, res, next) => {
    Rating.create({
        ratingOutOfFive: req.body.ratingOutOfFive,
        comment: req.body.comment
    }).then((rate) => {
        res.status(200).json(rate);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

module.exports.deleteRating = (req, res, next) => {
    
    let id = req.params.id;

    Rating.findByIdAndDelete(id, (err, rate) => {
        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(rate);
        }
    });
}

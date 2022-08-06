const Rate = require('../models/advertisement');

module.exports.getAllAdvertisements = function(req,res,next)
{
    Rate.find((err, rates) => 
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

module.exports.getRate = (req, res, next) => {
    let id = req.params.id;

    Rate.findById(id, (err, rate) =>{

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

module.exports.editRate = (req, res, next) => {
    let id = req.params.id;

    Rate.findByIdAndUpdate(id, {
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

module.exports.addRate = (req, res, next) => {
    Rate.create({
        ratingOutOfFive: req.body.ratingOutOfFive,
        comment: req.body.comment
    }).then((rate) => {
        res.status(200).json(rate);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

module.exports.deleteRate = (req, res, next) => {
    
    let id = req.params.id;

    Rate.findByIdAndDelete(id, (err, ad) => {
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

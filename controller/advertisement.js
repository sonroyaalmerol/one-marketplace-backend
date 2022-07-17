let Advertisement = require('../models/advertisement');

module.exports.getAllAdvertisements = function(req,res,next)
{
    Advertisement.find((err, ads) => 
    {
        if(err)
        {
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(ads);
        }
    });
}

module.exports.getAdvertisement = (req, res, next) => {
    let id = req.params.id;

    Advertisement.findById(id, (err, ad) =>{

        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else {
            res.status(200).json(ad);
        }

    });

}

module.exports.editAdvertisement = (req, res, next) => {
    let id = req.params.id;

    Advertisement.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price
    }, (err, ad) =>{
        if(err)
        {
            res.status(500).json({ error: err });
            console.log(err);
        }
        else 
        {
            res.status(200).json(ad);
        }
    });
}

module.exports.addAdvertisement = (req, res, next) => {
    Advertisement.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price
    }, (err, ad) =>{
        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(ad);
        }
    });
}

module.exports.deleteAdvertisement = (req, res, next) => {
    
    let id = req.params.id;

    Advertisement.findByIdAndDelete(id, (err, ad) => {
        if(err)
        {
            console.log(err);
            res.status(500).json({ error: err });
        }
        else
        {
            res.status(200).json(ad);
        }
    });
}

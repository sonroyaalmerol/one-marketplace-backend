const Advertisement = require('../models/advertisement');
const Question = require('../models/question');

module.exports.getAllNonExpiredAdvertisements = function(req,res,next)
{
    Advertisement.find({
        expiresAt: { $gt: new Date() },
        $or: [
            {
                disabled: false
            },
            {
                disabled: null
            }
        ]
    }, (err, ads) => 
    {
        if(err)
        {
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(ads);
        }
    });
}

module.exports.getSearchAdvertisements = function(req,res,next)
{
    let searchString = req.query.query;

    console.log(searchString)

    Advertisement.find({
        $text: { $search: searchString },
        expiresAt: { $gt: new Date() },
        $or: [
            {
                disabled: false
            },
            {
                disabled: null
            }
        ]
    }, (err, ads) => 
    {
        if(err)
        {
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(ads);
        }
    });
}

module.exports.getAllAnsweredQuestions = function(req,res,next)
{
    let id = req.params.id;

    Question.find({ answer: { $ne: null }, advertisement: id }, (err, questions) => 
    {
        if(err)
        {
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(questions);
        }
    });
}

module.exports.getAllQuestions = function(req,res,next)
{
    let id = req.params.id;

    Question.find({ advertisement: id }, (err, questions) => 
    {
        if(err)
        {
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(questions);
        }
    });
}

module.exports.getAdvertisement = (req, res, next) => {
    let id = req.params.id;

    Advertisement.findById(id, (err, ad) =>{

        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else {
            return res.status(200).json(ad);
        }

    });
}

module.exports.editAdvertisement = (req, res, next) => {
    let id = req.params.id;

    Advertisement.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
        category: req.body.category,
        disabled: req.body.disabled,
        expiresAt: req.body.expiresAt
    }, (err, ad) =>{
        if(err)
        {
            return res.status(500).json({ error: err });
            console.log(err);
        }
        else 
        {
            return res.status(200).json(ad);
        }
    });
}

module.exports.addAdvertisement = (req, res, next) => {
    Advertisement.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        user: req.payload.id,
        expiresAt: req.body.expiresAt
    }).then((ad) => {
        return res.status(200).json(ad);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
    });
}

module.exports.deleteAdvertisement = (req, res, next) => {
    
    let id = req.params.id;

    Advertisement.findByIdAndDelete(id, (err, ad) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(ad);
        }
    });
}

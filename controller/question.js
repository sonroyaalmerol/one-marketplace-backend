const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports.getQuestion = (req, res, next) => {
    let id = req.params.id;

    Question.findById(id, (err, question) =>{

        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else {
            return res.status(200).json(question);
        }

    });
}

module.exports.addQuestion = (req, res, next) => {
    Question.create({
        title: req.body.title
    }).then((question) => {
        return res.status(200).json(question);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
    });
}

module.exports.deleteQuestion = (req, res, next) => {
    
    let id = req.params.id;

    Question.findByIdAndDelete(id, (err, question) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else
        {
            return res.status(200).json(question);
        }
    });
}



module.exports.editAnswer = (req, res, next) => {
    let id = req.params.id;

    Answer.findOneAndUpdate({ question: id }, {
        content: req.body.content
    }, (err, answer) =>{
        if(err)
        {
            return res.status(500).json({ error: err });
            console.log(err);
        }
        else 
        {
            return res.status(200).json(answer);
        }
    });
}

module.exports.addAnswer = (req, res, next) => {
    let id = req.params.id;

    Answer.create({
        content: req.body.content,
        question: id
    }).then((answer) => {
        Question.findByIdAndUpdate(id, {
            answer: answer._id
        }, (err, question) =>{
            if(err)
            {
                return res.status(500).json({ error: err });
                console.log(err);
            }
            else 
            {
                return res.status(200).json(answer);
            }
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

module.exports.deleteAnswer = (req, res, next) => {
    let id = req.params.id;

    Answer.findOneAndDelete({ question: id }, (err, answer) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else
        {
            Question.findByIdAndUpdate(id, {
                answer: null
            }, (err, question) =>{
                if(err)
                {
                    return res.status(500).json({ error: err });
                    console.log(err);
                }
                else 
                {
                    return res.status(200).json(answer);
                }
            })
        }
    });
}


const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports.getQuestion = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Question.findOne({ _id: id, advertisement: advId }, (err, question) =>{
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
    let id = req.params.id;

    Question.create({
        content: req.body.content,
        advertisement: id
    }).then((question) => {
        return res.status(200).json(question);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
    });
}

module.exports.deleteQuestion = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Question.findOneAndDelete({ _id: id, advertisement: advId }, (err, question) => {
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

module.exports.getAnswer = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Question.findOne({ _id: id, advertisement: advId }, (err, question) =>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else {
            Answer.findById(question.answer, (err, answer) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                
                return res.status(200).json(answer);
            });
        }

    });
}

module.exports.editAnswer = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Question.findOne({ _id: id, advertisement: advId }, (err, question) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            Answer.findOneAndUpdate({ question: question._id }, {
                content: req.body.content
            }, (err, answer) =>{
                if(err)
                {
                    return res.status(500).json({ error: err });
                }
                else 
                {
                    return res.status(200).json(answer);
                }
            });
        }
    });
}

module.exports.addAnswer = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Answer.create({
        content: req.body.content,
        question: id
    }).then((answer) => {
        Question.findOneAndUpdate({ _id: id, advertisement: advId }, {
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
        return res.status(500).json({ error: err });
    });
}

module.exports.deleteAnswer = (req, res, next) => {
    let advId = req.params.id;
    let id = req.params.questionId;

    Answer.findOneAndDelete({ question: id }, (err, answer) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        else
        {
            Question.findOneAndUpdate({ _id: id, advertisement: advId }, {
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


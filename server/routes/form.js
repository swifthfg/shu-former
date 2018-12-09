const router = require('express').Router();

const FormQuestion = require('../models/FormQuestion');
const FormSubmission = require('../models/FormSubmission');

router.post('/question/create',
    (req, res, next) => {
        let formQuestion = new FormQuestion();
        let reqBody = req.body;
        formQuestion.questionText = reqBody.questionText;
        formQuestion.description = reqBody.description ? reqBody.description : '';
        formQuestion.maxScore = reqBody.maxScore;
        formQuestion.fieldName = reqBody.fieldName;

        formQuestion.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'New form question could not be created',
                });
            } else {
                res.send({
                    result: formQuestion,
                    success: true,
                    message: 'New form question is created',
                });
            }
        });
    }
);

router.get('/question/get-all',
    (req, res, next) => {
        FormQuestion.find({}, function (err, questions) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Database connection error! Could not get the questions.'
                });
            } else {
                res.send({
                    success: true,
                    message: 'Question are fetched successfully',
                    result: questions
                });
            }
        });
    }
);

router.post('/submission/create',
    (req, res, next) => {
        let formSubmission = new FormSubmission();
        let reqBody = req.body;
        formSubmission.fields = reqBody.fields;
        formSubmission.ipMeta = reqBody.ipMeta;
        formSubmission.shuToken = reqBody.shuToken;
        formSubmission.fieldName = reqBody.fieldName;

        formSubmission.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send({
                   success:false,
                   message: err.message
                });
            } else {
                res.send({
                    result: formSubmission,
                    success: true,
                    message: 'Form submission is created',
                });
            }
        });
    }
);




module.exports = router;
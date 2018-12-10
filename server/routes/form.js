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
        formSubmission.ipMeta = req.headers['user-agent'];
        formSubmission.shuToken = reqBody.shuToken;
        formSubmission.fieldName = reqBody.fieldName;

        FormSubmission.findOne({shuToken: formSubmission.shuToken}, function (err, existingSubmission) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success:false,
                    message: err.message
                });
            }
            else if (existingSubmission) {
                res.send({
                    code: 600,
                    result: {overAllScore: existingSubmission.overAllScore, fields: existingSubmission.fields},
                    success: true,
                    message: 'You already submitted form before',
                });
            } else {
                formSubmission.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            success:false,
                            message: err.message
                        });
                    } else {
                        res.send({
                            result: {overAllScore: formSubmission.overAllScore, fields: formSubmission.fields},
                            success: true,
                            message: 'Form submission is created',
                        });
                    }
                });
            }
        });
    }
);

router.get('/submission/get-all',
    (req, res, next) => {
        FormSubmission.find({}, function (err, submissions) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Database connection error! Could not get the submissions.'
                });
            } else {
                res.send({
                    success: true,
                    message: 'Submissions are fetched successfully',
                    result: submissions
                });
            }
        });
    }
);

router.post('/submission/get-by-token',
    (req, res, next) => {
        FormSubmission.findOne({shuToken: req.body.shuToken}, function (err, submission) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Database connection error! Could not get the submission!'
                });
            } else {
                if (submission) {
                    res.send({
                        success: true,
                        message: 'Submissions are fetched successfully',
                        result: submission
                    });
                } else {
                    res.status(500).send({
                        success: false,
                        message: 'There is no submission with sent token',
                    });
                }
            }
        });
    }
);

module.exports = router;
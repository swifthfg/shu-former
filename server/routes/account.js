const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');
const middleware = require('../middlewares/token-controller');

const FormQuestion = require('../models/FormQuestion');
const FormSubmission = require('../models/FormSubmission');

router.post('/register-admin', (req, res, next) => {
    let user = new User();
    let reqBody = req.body;
    user.email = reqBody.email;
    user.name = reqBody.name;
    user.password = reqBody.password;

    User.findOne({email: reqBody.email}, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email already exists'
            });
        } else {
            user.save();
            let token = jwt.sign({
                user: user
            }, config.secret, {expiresIn: '1h'});

            res.json({
                result: {_id: user._id , name: user.name, email:user.email},
                success: true,
                message: 'New user saved',
                adminToken: token
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            throw err;
        }
        if (!existingUser) {
            res.json({
                success: false,
                message: 'Wrong credentials'
            });
        } else {
            let isPasswordValid = existingUser.comparePassword(req.body.password);
            if (!isPasswordValid) {
                res.json({
                    success: false,
                    message: 'Password is wrong'
                });
            } else {
                let token = jwt.sign({
                    user: existingUser
                }, config.secret, {expiresIn: '1h'});
                res.json({
                    result: {_id: existingUser._id , name: existingUser.name, email:existingUser.email},
                    success: true,
                    message: 'Login successful',
                    adminToken: token
                });
            }
        }
    });
});

router.get('/app-data',
    middleware.getUserFromTokenAndForward,
    (req, res, next) => {
        FormQuestion.find({}, function (err, questions) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Database connection error! Could not get the questions.'
                });
            } else {
                const allQuestions = questions;
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
                            message: 'Data is successfully fetched',
                            result: {submissions: submissions,
                                     questions: allQuestions,
                                     user: {id:req.user.user._id, name: req.user.user.name, email: req.user.user.email}
                                    }
                        });
                    }
                });
            }
        });
    }
);


module.exports = router;

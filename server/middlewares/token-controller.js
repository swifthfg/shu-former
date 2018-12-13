const jwt = require('jsonwebtoken');
const config = require('../config.js');

const RSA_PUBLIC_KEY = config.secret;

const getUserFromTokenAndForward = function(req, res, next) {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'You are not authorized.'
        });
    } else {
        jwt.verify(token, RSA_PUBLIC_KEY, function (err, decodedUser) {
            if(err) {
                return res.status(403).send({
                    success: false,
                    message: err.message
                });
            } else {
                req.user = decodedUser;
                next();
            }
        });
    }
};

module.exports = {
    getUserFromTokenAndForward: getUserFromTokenAndForward
};


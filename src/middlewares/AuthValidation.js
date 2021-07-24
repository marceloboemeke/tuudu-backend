const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/Auth.json');

const AuthValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided', code: 11 });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error', code: 12 });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted', code: 13 });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token', code: 14 });

        req.body.userId = decoded.params.id;
        next();
    });
};

module.exports = AuthValidation;
const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/Auth.json');

const AuthValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });

        req.body.userId = decoded.params.id;
        next();
    });
};

module.exports = AuthValidation;
const UserModel = require('../model/UserModel');

const UserValidation = async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name)
        return res.status(400).json({ error: 'Name is required', code: 21 });
    else if (!email)
        return res.status(400).json({ error: 'E-mail is required', code: 22 });
    else if (!password)
        return res.status(400).json({ error: 'Password is required', code: 23 });
    else {

        let exists = await UserModel.findOne({ 'email': {'$eq': req.body.email}});
        
        if (exists) {
            return res.status(400).json({ error: 'user already exists', code: 24 });
        }

        next();
    }

};

module.exports = UserValidation;
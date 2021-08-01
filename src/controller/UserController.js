const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

const authConfig = require('../config/Auth.json');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const user = await User.create(rew.body);
//         return res.status(200).send({ user });
//     } catch(err) {
//         return res.status(400).send({ error: 'Registration failed' });
//     }
// });


//

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, { expiresIn: 86400 });
}

class UserController {

    async create(req, res) {
        const user = new UserModel(req.body);
        await user
                .save()
                .then(response => {
                    response.password = undefined;
                    return res.status(200).send({response, token: generateToken({ id: response._id })});
                })
                .catch(error => {
                    return res.status(400).json(error);
                });
    }

    async update(req, res) {
        await UserModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
                .then(response => {
                    response.password = undefined;
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(400).json(error);
                });
    }

    async show(req, res) {
        await UserModel.findById(req.params.id)
                .then(response => {
                    if (response)
                        return res.status(200).json(response);
                    else
                        return res.status(404).json({ error: 'User not found' });
                })
                .catch(error => {
                    return res.status(400).json(error);
                });
    }

    async delete(req, res) {
        await UserModel.deleteOne({ '_id': req.params.id })
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(400).json(error);
                });
    }

    // Authentication

    async login(req, res) {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).json({ error: 'User not found', code: 25 });

        if (! await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: 'Invalid password', code: 26});

        user.password = undefined;

        return res.status(200).json({ user, token: generateToken({id: user.id}) });
    }

    async validatetoken(req, res) {
        const { token } = req.body;

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(400).json({ valid: false });
    
            req.body.userId = decoded.params.id;
            return res.status(200).json({ valid: true });
        });
    }

    async forgotpassword(req, res) {
        const { email } = req.body;

        try {
            const user = await UserModel.findOne({ email });

            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() +1);

            await UserModel.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            mailer.sendMail({
                to: email,
                from: {
                    name: 'Tuudu',
                    address: 'tuudu@marceloboemeke.com.br'
                },
                subject: 'Recuperação de senha Tuudu',
                template: 'auth/forgot_password',
                context: { token }
            }, (err) => {
                if (err) {
                    return res.status(400).send({ error: 'Cannot send password recovery email'})
                }
                
                res.status(200).json({ generated: 'Success' });
            });
        } catch (err) {
            res.status(400).send({ error: 'Error on forgot password' });
        }
    }

}

module.exports = new UserController();
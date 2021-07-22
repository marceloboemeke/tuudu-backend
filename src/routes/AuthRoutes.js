const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');
const UserValidation = require('../middlewares/UserValidation');

router.post('/', UserController.login);
router.post('/validatetoken', UserController.validatetoken);
// router.put('/:id', UserValidation, UserController.update);
// router.get('/:id', UserController.show);
// router.delete('/:id', UserController.delete);

module.exports = router;
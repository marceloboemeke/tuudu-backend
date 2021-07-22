const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const AuthValidation = require('../middlewares/AuthValidation');

router.post('/', AuthValidation, TaskValidation, TaskController.create);
router.put('/:id', [AuthValidation, TaskValidation], TaskController.update);
router.get('/:id', AuthValidation, TaskController.show);
router.delete('/:id', AuthValidation, TaskController.delete);
router.put('/:id/:done', AuthValidation, TaskController.done);

router.get('/filter/all', AuthValidation, TaskController.all);
router.get('/filter/late', AuthValidation, TaskController.late);
router.get('/filter/today', AuthValidation, TaskController.today);
router.get('/filter/week', AuthValidation, TaskController.week);
router.get('/filter/month', AuthValidation, TaskController.month);
router.get('/filter/year', AuthValidation, TaskController.year);

module.exports = router;
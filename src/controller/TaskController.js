const TaskModel = require('../model/TaskModel');
const { 
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek, 
    startOfMonth, 
    endOfMonth, 
    startOfYear,
    endOfYear
} = require('date-fns');

class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
                .save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async all(req, res) {
        await TaskModel.find({ 'userId': { '$in': req.body.userId } })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async show(req, res) {
        await TaskModel.findById(req.params.id)
                .then(response => {
                    if (response)
                        return res.status(200).json(response);
                    else
                        return res.status(404).json({ error: 'Task not found', code: 34 });
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async delete(req, res) {
        await TaskModel.deleteOne({ '_id': req.params.id })
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async done(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, { 'done': req.params.done }, {new: true})
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async late(req, res) {
        const current = new Date();
        await TaskModel.find({
                'when': { '$lt': current },
                'done': {'$eq': false},
                'userId': { '$in': req.body.userId }
                })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async today(req, res) {
        const current = new Date();
        await TaskModel.find({
                'userId': { '$in': req.body.userId },
                'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
                })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async week(req, res) {
        const current = new Date();
        await TaskModel.find({
                'userId': { '$in': req.body.userId },
                'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
                })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async month(req, res) {
        const current = new Date();
        await TaskModel.find({
                'userId': { '$in': req.body.userId },
                'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
                })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async year(req, res) {
        const current = new Date();
        await TaskModel.find({
                'userId': { '$in': req.body.userId },
                'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
                })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }
}

module.exports = new TaskController();
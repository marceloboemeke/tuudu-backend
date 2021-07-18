const WebChannelsModel = require('../model/WebChannelsModel');
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

const current = new Date();

class TaskController {

    async create(req, res) {
        const task = new WebChannelsModel(req.body);
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
        await WebChannelsModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async all(req, res) {
        await WebChannelsModel.find({ 'macaddress': { '$in': req.params.macaddress } })
                .sort('done when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async show(req, res) {
        await WebChannelsModel.findById(req.params.id)
                .then(response => {
                    if (response)
                        return res.status(200).json(response);
                    else
                        return res.status(404).json({ error: 'Tarefa não encontrada' });
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async delete(req, res) {
        await WebChannelsModel.deleteOne({ '_id': req.params.id })
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async done(req, res) {
        await WebChannelsModel.findByIdAndUpdate({ '_id': req.params.id }, { 'done': req.params.done }, {new: true})
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }

    async late(req, res) {
        await WebChannelsModel.find({
                'when': { '$lt': current },
                'done': {'$eq': false},
                'macaddress': { '$in': req.params.macaddress }
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
        await WebChannelsModel.find({
                'macaddress': { '$in': req.params.macaddress },
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
        await WebChannelsModel.find({
                'macaddress': { '$in': req.params.macaddress },
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
        await WebChannelsModel.find({
                'macaddress': { '$in': req.params.macaddress },
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
        await WebChannelsModel.find({
                'macaddress': { '$in': req.params.macaddress },
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
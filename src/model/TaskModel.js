const mongoose = require('../config/database');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    macaddress: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    when: { type: Date, required: true },
    done: { type: Boolean, default: false },
    created: { type: Date, defualt: Date.now() }
});

module.exports = mongoose.model('Task', TaskSchema);
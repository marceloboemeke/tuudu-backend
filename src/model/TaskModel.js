const { isValidObjectId } = require('../config/database');
const mongoose = require('../config/database');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    when: { type: Date, required: true },
    done: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    userId: { type: String, required: true }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
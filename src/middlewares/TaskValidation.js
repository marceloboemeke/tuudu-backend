const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when, userId } = req.body;

    if (!userId)
        return res.status(400).json({ error: 'userId is required', code: 31 });
    else if (!title)
        return res.status(400).json({ error: 'Title is required', code: 32 });
    else if (!when)
        return res.status(400).json({ error: 'Date and Time are required', code: 33 });
    else {

        next();
    }

};

module.exports = TaskValidation;
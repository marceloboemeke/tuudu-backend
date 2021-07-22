const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when, userId } = req.body;

    if (!userId)
        return res.status(400).json({ error: 'userId é obrigatório' });
    else if (!title)
        return res.status(400).json({ error: 'Título é obrigatório' });
    else if (!when)
        return res.status(400).json({ error: 'Data e Hora são obrigatórios' });
    else {

        next();
    }

};

module.exports = TaskValidation;
const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const TaskRoutes = require('./routes/TaskRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

app.use('/task', TaskRoutes);
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);

app.listen(3333, () => {
    console.log("api online");
});
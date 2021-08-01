const express = require('express');

//Tests only
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
//

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
    console.log(startOfDay(current));
    console.log(endOfDay(current));
});
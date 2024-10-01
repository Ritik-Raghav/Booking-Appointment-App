const express = require('express');

const sequelize = require('./util/database');
const User = require('./models/user');

const cors = require('cors');

const bodyParser = require('body-parser');

const formRoutes = require('./routes/form');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', formRoutes);


sequelize.sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error)
    })

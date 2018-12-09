const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

let mongoDBUrl = config.databaseUrl;
mongoose.connect(mongoDBUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

const formRoutes = require('./routes/form');

app.use('/api/form', formRoutes);

app.listen(config.port, (err) => {
    console.log("Listening " + config.port);
});
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
let dotenv = require ('dotenv');
dotenv.load();

const hobbyRoutes = require('./hobbies/hobbyRoutes.js');
const userRoutes = require('./users/userRoutes.js');

const server = express();

server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000'}));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/hobbies', hobbyRoutes);
server.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/autoSchedulerDB', { useNewUrlParser: true }, (error) => {
    if (error) console.log(error);
    else console.log('Mongoose connected us to autoSchedulerDB');
});

server.listen(port, () => console.log(`\n=== API running on port: ${port} ===\n`));
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const helmet = require('helmet');
const morgan  = require('morgan');
const config = require('config');
const debug=require('debug')('app:debug');
const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(helmet());
app.use('/',home);
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;

mongoose.connect(config.get('connectionString'))
.then(()=>debug('Connected to MongoDB'))
.catch(err=>{debug('Error in connecting:', err)});


debug(`Application Name: ${config.get('name')}`);
debug(`NODE_ENV: ${app.get('env')}`);
if( app.get('env')==='development'){
    debug('Morgan enabled');
    app.use(morgan('dev'));
}

app.listen(port, ()=>{debug(`Listening... ${port}`)});


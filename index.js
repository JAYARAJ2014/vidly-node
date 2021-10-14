const home = require('./routes/home');
const genres = require('./routes/genres');
const Joi = require('joi');
const helmet = require('helmet');
const morgan  = require('morgan');
const config = require('config');
const debug=require('debug')('app:startup');
const express = require('express');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(helmet());
app.use('/',home);
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;

debug(`Application Name ${config.get('name')}`);
debug(`NODE_ENV: ${app.get('env')}`);
if( app.get('env')==='development'){
    debug('Morgan enabled');
    app.use(morgan('dev'));
}

app.listen(port, ()=>{debug(`Listening... ${port}`)});


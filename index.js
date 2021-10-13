const homeRouter = require('./routes/home');
const genresRouter = require('./routes/genres');
const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan  = require('morgan');
const config = require('config');
const debug=require('debug')('app:startup');
const app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(helmet());
app.use('/',homeRouter);
app.use('/api/genres',genresRouter);

const port = process.env.PORT || 3000;

debug(`Application Name ${config.get('name')}`);
debug(`NODE_ENV: ${app.get('env')}`);
if( app.get('env')==='development'){
    debug('Morgan enabled');
    app.use(morgan('dev'));
}

app.listen(port, ()=>{debug(`Listening... ${port}`)});


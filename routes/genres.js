const express = require('express');
const router = express.Router();
const GenreModel  = require('../models/genre');
const debug=require('debug')('app:db');
const Joi = require('joi');

router.get('/',async (req,res)=>{
    debug('HTTP GET fired...');
    const genres = await GenreModel.find().sort('name');
    debug(genres);
    res.send(genres);
});
router.get('/:id',async (req,res)=> {
    debug(`Received req.params.id: ${req.params.id}`)
    const genre = await GenreModel.findById(req.params.id);
    debug(`genre retreived is ${genre}`);
    if(!genre){
         res.status(404).send(`${req.params.id} Not found`);
         return;
    }
    res.send(genre);
});
router.post('/',async (req,res)=>{
    debug(`Request body is : ${JSON.stringify(req.body)}`);
    const {error} =validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    let genre = new GenreModel({name: req.body.name});
    genre=await genre.save()
    res.send(genre);

});
router.put('/',async (req,res)=>{

    debug(`Request body is : ${JSON.stringify(req.body)}`);

    const {error} =validateGenre({name: req.body.name});
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = await GenreModel.findByIdAndUpdate(req.body.id,{name:req.body.name}, {new:true});
    debug(`genre retreived is ${genre}`);
    if(!genre){
         res.status(404).send(`${req.params.id} Not found`);
         return;
    }
    res.send(genre);
});
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string()
        .min(5)
        .max(50)
        .required(),
    });
   return schema.validate(genre);
}


router.delete('/:id',async (req,res)=>{
    debug('DELETE REQUEST FIRED');
    const genre = await GenreModel.findByIdAndRemove(req.params.id);
    if(!genre){
        res.status(404).send(`${req.params.id} Not found`);
        return;
   }
    res.status(204).send();
});


module.exports = router; 
let genres = require('../data/genres');
const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send(genres);
});
router.get('/:id',(req,res)=> {
    debug(`Received req.params.id: ${req.params.id}`)
    let genre = genres.find(g=>g.id===parseInt(req.params.id));
    debug(`genre retreived is ${genre}`);
    if(!genre){
         res.status(404).send(`${req.params.id} Not found`);
         return;
    }
    res.send(genre);
});
router.post('/',(req,res)=>{
    debug(`Request body is : ${JSON.stringify(req.body)}`);
    const {error} =validateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = {
        id: genres.length+1, 
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);

});
router.put('/',(req,res)=>{

    debug(`Request body is : ${JSON.stringify(req.body)}`);
   

    const {error} =validateGenre({name: req.body.name});
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let genre = genres.find(g=>g.id===parseInt(req.body.id));
    debug(`genre retreived is ${genre}`);
    if(!genre){
         res.status(404).send(`${req.params.id} Not found`);
         return;
    }
    
    genre.name= req.body.name;
    res.send(genre);
});

router.delete('/api/genres/:id',(req,res)=>{
    let genre = genres.find(g=>g.id===parseInt(req.params.id));
    const index= genres.indexOf(genre);

    genres.splice(index,1);
    res.status(204);
    res.send();

});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .max(15)
        .required(),
    });
   return schema.validate(genre);
}


module.exports = router; 
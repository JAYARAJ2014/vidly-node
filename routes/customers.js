const express=require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');
const debug=require('debug')('app:customers');
const Joi = require('joi');


router.get('/',async (req,res)=>{
    const customers = await CustomerModel.find().sort('name');
    debug(customers);
    res.send(customers);
});

router.get('/:id',async (req,res)=>{
    const customer = await CustomerModel.findById(req.params.id);
    debug(customer);
    if(!customer) {
        res.status(404).send(`${req.params.id} Not found`);
        return;
    }
    res.send(customer);
});

router.post('/',async (req,res)=>{
    debug(`Request body is : ${JSON.stringify(req.body)}`);
    // const {error} =validateGenre(req.body);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    
    let customer = new CustomerModel(
        {
            isGold:req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }
    );
    customer=await customer.save()
    res.send(customer);

});
router.put('/', async(req, res)=>{

    debug(`Request body is : ${JSON.stringify(req.body)}`);

    // const {error} =validateCustomer({name: req.body});
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    const customer = await CustomerModel.findByIdAndUpdate(req.body.id,{name:req.body.name, isGold: req.body.isGold, phone:req.body.phone}, {new:true});
    debug(`customer retreived is ${customer}`);
    if(!customer){
         res.status(404).send(`${req.body.id} Not found`);
         return;
    }
    res.send(customer);
});



function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string()
        .min(5)
        .max(50)
        .required(),

        phone: Joi.string()
        .min(7)
        .max(13)
    });
   return schema.validate(customer);
}

module.exports = router; 

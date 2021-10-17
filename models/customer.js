const mongoose = require('mongoose');

const CustomerModel = mongoose.model('Customer', new mongoose.Schema(
    {
        isGold: {
            type: Boolean,
            default:false
        },
        name: {
            type: String,
            required:true,
            minlength: 5,
            maxlength:50
        },
        phone: {
            type: String 
        }
    }
));

module.exports = CustomerModel;
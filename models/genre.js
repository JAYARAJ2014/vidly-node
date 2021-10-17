const mongoose = require('mongoose');

const GenreModel = mongoose.model('Genre', new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
            minlength: 5,
            maxlength:50
        }
    }
));

module.exports = GenreModel;
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let GENDERS = ["Male", "Female", "male", "female"]
let PURCHASE_TYPE = ["Dealer"]
var animalSchema = new mongoose.Schema({
    batch_no: {
        type: String,
    },
    id_no: {
        type: String,
    },
    purchase_type: {
        type: String,
        // enum: PURCHASE_TYPE
        type: String

    },
    // fish
    purchase_date: {
        type: Date
    },
    fish_name: {
        type: String
    },
    bio_flock_plant_no: {
        type: String
    },

    // common

    weight: {
        type: String,
    },
    color: {
        type: String,
    },
    gender: {
        type: String,
        // enum: GENDERS
        type: String

    },
    age: {
        type: String,
    },
    quantity: {
        type: String,
    },
    animal_picture: [
        {
            img: { type: String }
        }
    ],
    buying_price: {
        type: String,
    },
    selling_price: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Animal', animalSchema);
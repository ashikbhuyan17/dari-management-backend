const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let PURCHASE_TYPE = ["Cow", "Goat"]
var purchaseSchema = new mongoose.Schema({
    batch_no: {
        type: String,
    },
    purchase_type: {
        type: String,
        enum: PURCHASE_TYPE
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
    },
    total_price: {
        type: String,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    //     required: true
    // },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Purchase', purchaseSchema);
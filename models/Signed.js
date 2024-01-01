const mongoose = require("mongoose");

const SignedSchema = mongoose.Schema({
    name : {
        type : String, 
    },

    email : {
        type : String, 
        // required : true
    },

    phonenumber : {
        type : String, 
        // required : true
    }

} , {
    timestamps : true
})

const signedModel = mongoose.model('signedupusers', SignedSchema);

module.exports = signedModel;
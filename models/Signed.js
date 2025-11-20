const mongoose = require("mongoose");

const SignedSchema = mongoose.Schema({
    fname : {
        type : String, 
    },
    lname : {
        type : String, 
    },
    style : {
        type : String, 
    },
    size : {
        type : String, 
    },
    email : {
        type : String, 
    },
    phonenumber : {
        type : String, 
    },
    zipcode : {
        type : String, 
    }

} , {
    timestamps : true
})

const signedModel = mongoose.model('signedupusers', SignedSchema);

module.exports = signedModel;
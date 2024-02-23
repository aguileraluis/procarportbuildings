const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String, 
    },

    fname : {
        type : String, 
        // required : true
    },

    lname : {
        type : String, 
        // required : true
    },
    
    email : {
        type : String,
        // required : true
    },

    phonenumber : {
        type : String,
    },

    address : {
        type: String,
    }, 

    totalprice : {
        type : String
    }, 

    fifteenpercent : {
        type : String
    }, 
    sideheight : {
        type : String
    }, 
    height : {
        type : String
    }, 
    bothsidesclosed : {
        type : String
    }, 
    verticalsides : {
        type : String
    }, 
    eachend : {
        type: String
    }

} , {
    timestamps : true
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;


// const mongoose = require("mongoose");

// const orderSchema = mongoose.Schema({
//     productname: {
//         type: String, required: true
//     },
//     productid: {
//         type: String, required: true
//     },
//     fifteenpercent: {
//         type: String, required: true
//     },
//     totalamount: {
//         type: Number, required: true
//     },
//     firstname: {
//         type : String, required: true
//     }, 
//     lastname: {
//         type: String, required: true
//     }, 
//     address: {
//         type: String, required: true
//     }, 
//     email: {
//         type: String, required: true
//     },
//     phonenumber: {
//         type: Number, required: true
//     },
// }, {
//     timestamps: true,
// })

// const orderModel = mongoose.model('orders', orderSchema);

// module.exports = orderModel; 


// const mongoose = require("mongoose");

// const bookingSchema = mongoose.Schema({

//     room: {
//         type: String, required: true
//     },
//     roomid: {
//         type: String, required: true
//     },
//     firstname: {
//         type: String, required: true
//     }, 
//     lastname: {
//         type: String, required: true
//     },
//     email: {
//         type: String, required: true
//     }, 
//     address: {
//         type: String, required: true
//     }, 
//     phonenumber: {
//         type: String, required:true
//     },
//     fromdate: {
//         type: String, required: true
//     },
//     todate: {
//         type: String, required: true
//     },
//     totalamount: {
//         type: Number, required: true
//     },
//     totaldays: {
//         type: Number, required: true
//     },
//     rentPerDay: {
//         type: String, required: true
//     },
//     transactionId: {
//         type: String, required: true
//     },


// }, {
//     timestamps: true,
// })

// const bookingModel = mongoose.model('bookings', bookingSchema);

// module.exports = bookingModel; 

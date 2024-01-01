const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
    {
        id: { type: String, required: true }, 
        products: [
            {
                productId: {
                    type: String
                }, 
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    }
); 


const cartModel = mongoose.model('cart', CartSchema)
module.exports = cartModel;
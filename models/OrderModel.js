const {Schema,model}  = require('mongoose')

const OrdersSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    gid: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean, 
        default: false
    },
    paidAt: { 
        type: Date
     },
     phone:{
       type: String,

     },
    orderedAt: { 
        type: Date, 
        default: Date.now 
    },
})

//create the Orders Model
const Orders = model('orders',OrdersSchema)

module.exports = Orders


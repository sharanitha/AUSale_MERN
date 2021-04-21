const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    seller:{
        type: String,
    },
    sellerEmail:{
        type: String,
    },
    buyer:{
        type: String,
    },
    buyerEmail:{
        type: String,
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
});

module.exports = mongoose.model("Products", productSchema)
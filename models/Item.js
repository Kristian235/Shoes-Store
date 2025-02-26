const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    imageURL:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    quantity:{
        type: Number
    }
});


const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

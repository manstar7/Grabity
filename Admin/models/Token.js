const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
    
    name: {
        type: String,
        default:""
    },
    symbol: {
        type: String,
        default:" "
    },
    addresses: {
        type: String,
        default:" "
    },
    chainId: {
        type: Number,
        default:0
    },
    decimals: {
        type: Number,
        default:0
    },
    image: {
        type: String,
        default:""
    },
    updated_time: {
        type: Date,
        default: Date.now
    }
});

TokenSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

TokenSchema.set('toJSON', {
    virtuals: true
});

module.exports = Token = mongoose.model("tokens", TokenSchema);

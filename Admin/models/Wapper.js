const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WapperSchema = new Schema({
    fromAddress: {
      type: String,
      default : ""
    },
    amount: {
        type: Number,
        default:0
    },
     updated_time: {
        type: Date,
        default: Date.now
    }
});

WapperSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

WapperSchema.set('toJSON', {
    virtuals: true
});

module.exports = Wapper = mongoose.model("wappers", WapperSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FormSchema = new Schema({
    pid: {
      type: Number,
      default:0
    },
    risk: {
        type: Number,
        default:0
    },
    lpSymbol: {
        type: String,
        default:""
    },
    alloc: {
        type: String,
        default:""
    },
    isTokenOnly: {
        type: Boolean,
        default:"false"
    },
    lpAddresses: {
        type: String,
        default:" "
    },
    tokenSymbol: {
        type: String,
        default:""
    },
    tokenAddresses: {
        type: String,
        default:""
    },
    quoteTokenSymbol: {
        type: String,
        default:""
    },
    quoteTokenAdresses: {
        type: String,
        default:""
    },
    depositFee:
    {
        type: String,
        default:""
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

FormSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

FormSchema.set('toJSON', {
    virtuals: true
});

module.exports = Form = mongoose.model("forms", FormSchema);

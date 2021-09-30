const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
     default:""
    },
    email: {
        type: String,
        default:""
    },
    password: {
        type: String,
        default:""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model("users", UserSchema);

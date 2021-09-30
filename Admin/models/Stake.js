const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StakeSchema = new Schema({
 
    TokenIN: {
          type: String,
          default:""
      },
      
      TokenOUT: {
          type: String,
          default:""
      },
      uint256_startBlock: {
        type: String,
        default:""
    },
    uint256_lockBlock: {
          type: String,
          default:""
      },
      uint256_rewardPerBlock:
      {
          type: String,
          default:""
      },
      uint256_endBlock:
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

StakeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

StakeSchema.set('toJSON', {
    virtuals: true
});

module.exports = Stake = mongoose.model("stakes", StakeSchema);

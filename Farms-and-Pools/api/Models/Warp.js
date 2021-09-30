const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Warp = new Schema({
	txId:{type: Number},
	fromAddress: { type: String },
	cryptoIn: { type: String },
	amountIn: { type: String },
	status: { type: Boolean, default: false },
	txHash: { type: String , default: "-"},
	time : { type : Date, default: Date.now }
	
})

module.exports = mongoose.model('Warp', Warp);
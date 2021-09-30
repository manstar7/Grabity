var Web3 = require('web3');
const { update } = require('../Models/Warp');
var web3 = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545/');
var Warp = require("../Models/Warp");

const Wrap = "0x4Ee6C2e3Cf95acdDd7F309dc8b079c7ACF2AF848";

const WrapABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"txId","type":"uint256"}],"name":"WrappedToken","type":"event"},{"inputs":[{"internalType":"address","name":"_crypto","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"WrapTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_txInfo","outputs":[{"internalType":"address","name":"crypto","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_crypto","type":"address"}],"name":"getCryptoBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"txCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_crypto","type":"address"}],"name":"withdrawCrypto","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];


exports.createRequest = async (req,res) => {
	const wrapContract = new web3.eth.Contract(WrapABI,Wrap);
	const txId = await wrapContract.methods.txCount.call()
	console.log("data====>",txId)
	const createReq = new Warp({
		txId: txId,
		fromAddress: req.body.fromAddress,
		cryptoIn: req.body.cryptoIn,
		amountIn: req.body.amountIn,
	})
	console.log('createReq',createReq);
	createReq.save().then((data) => {
		res.send(data)
	}).catch((e) => {
		res.send(e)
	})
}

exports.updateRequest = async (req,res) => {
	
	const txId = req.body.txId;
	const txHash = req.body.txHash;
	const details = await Warp.findOneAndUpdate({ txId: txId},{txHash: txHash, status: true}).then((data)=>{
		res.json(data)
	})
	.catch((e) => {
		console.log("error", e)
	})

}

exports.getRequests = async (req, res) => {
	const getdata = Warp.find({}).then((data) => {
		res.json(data)
	}).catch((e) => {
		res.send(e)
	})
}


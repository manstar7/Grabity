const express = require('express')
const cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose')

const initialroute = require("./Routes/initialroute");

const app = express();
app.use(cors());
app.use(express.json());

// mongodb+srv://root:pbom8D8VCnoyjTXB@cluster0.clmic.mongodb.net/Wrap

mongoose.connect('mongodb+srv://root:pbom8D8VCnoyjTXB@cluster0.clmic.mongodb.net/Wrap',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
(err) => {
	console.log('DB Connected')
})

//Routes
app.use('/api', initialroute)
app.use('/api', (req,res) => {
	res.json({"Grabity":"Welcome"})	
})

app.listen(2053, () => {
	console.log("server connected")
})

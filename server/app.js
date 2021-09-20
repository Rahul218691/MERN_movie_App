require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const logger = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger('dev'))

app.get('/',(req,res) =>{
	res.send('API Running')
})

app.use('/api',require('./src/routes/authRoutes'));
app.use('/api',require('./src/routes/movieRoutes'));
app.use('/api',require('./src/routes/posterRoutes'));
app.use('/api',require('./src/routes/categoryRoutes'));

const URI = process.env.MONGO_URI;
mongoose.connect(URI,{
	useUnifiedTopology:true,
	useNewUrlParser:true
},err=>{
	if(err) throw err;
	console.log('Mongodb connected successfully')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`);	
});
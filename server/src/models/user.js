const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		trim:true,
		required:true
	},
	email:{
		type:String,
		trim:true
	},
	profile:{
		type:String
	},
	role:{
		type:String,
		default:'user'
	},
	verified:{
		type:Boolean,
		default:false
	}
},{
	timestamps:true
});

module.exports = mongoose.model('user',userSchema);


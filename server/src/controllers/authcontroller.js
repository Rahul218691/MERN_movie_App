const User = require('../models/user');
const {OAuth2Client} = require('google-auth-library');
const generateToken = require('../utils/generateToken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const googleAuth = async(req,res) =>{
	try {
		const {tokenId} = req.body;
		const clientResp = await client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT});
		const {name,email_verified,email,picture} = clientResp.payload;
		if(!email_verified) return res.status(400).json({msg:'Email not verified'});
		const user = await User.findOne({email});
		if(!user){
			const newUser = await User.create({
				username:name,
				email,
				profile:picture,
				verified:email_verified
			});
			const access_token = generateToken(newUser._id);
			res.json({
				access_token,
				user:{
					...newUser._doc
				}
			});
		}else{
			const access_token = generateToken(user._id);
			res.json({
				access_token,
				user:{
					...user._doc
				}
			});			
		}
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


module.exports = {
	googleAuth
}
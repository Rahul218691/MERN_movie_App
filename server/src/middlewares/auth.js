const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = await User.findById(decoded.id)
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({
        msg:'Not authorized, token failed'
      })
    }
  }

  if (!token) {
     res.status(400).json({
       msg:'Not authorized, no token'
     })
  }
}

module.exports = {
	protect
}
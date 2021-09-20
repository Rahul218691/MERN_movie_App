const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id },process.env.SECRET_TOKEN, {
    expiresIn: '1d',
  })
}


module.exports = generateToken;

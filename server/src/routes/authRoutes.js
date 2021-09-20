const router = require('express').Router();
const {googleAuth} = require('../controllers/authcontroller');


router.post('/auth',googleAuth);


module.exports = router;
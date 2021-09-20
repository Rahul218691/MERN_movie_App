const router = require('express').Router();

const {getTrending,searchData,showDetails} = require('../controllers/moviecontroller');
const {protect} = require('../middlewares/auth');

router.get('/trending',protect,getTrending);
router.post('/search',protect,searchData);
router.get('/details/:id/:type',protect,showDetails);

module.exports = router;
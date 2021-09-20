const router = require('express').Router();
const {getBannerData,getMovieBanners,getTvBanners} = require('../controllers/postercontroller');
const {protect} = require('../middlewares/auth');

router.get('/poster',protect,getBannerData);
router.get('/movieposter',protect,getMovieBanners);
router.get('/tvposter',protect,getTvBanners);

module.exports = router;
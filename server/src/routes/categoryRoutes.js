const router = require('express').Router();
const {getMovieCategory,getTvCategory,genreMovies,tvShows} = require('../controllers/categorycontroller');
const {protect} = require('../middlewares/auth');

router.get('/moviegenre',protect,getMovieCategory);
router.get('/tvgenre',protect,getTvCategory);

router.post('/moviegenre',protect,genreMovies);
router.post('/tvgenre',protect,tvShows);

module.exports = router;
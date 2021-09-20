const axios = require('axios');
const {GET_ASYNC,SET_ASYNC} = require('../helpers/redis.helper');

const getMovieCategory = async(req,res) =>{
	try {
		const redismoviegenre = await GET_ASYNC('moviegenre');
		if(redismoviegenre){
			return res.json(JSON.parse(redismoviegenre));
		}		
		const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API}&language=en-US`);
		if(data.genres){
			await SET_ASYNC('moviegenre',JSON.stringify(data.genres),'EX',60*60*24);
			res.json(data.genres);
		}else{
			return res.json({msg:'Failed to fetch genres'});
		}
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


const getTvCategory = async(req,res) =>{
	try {
		const redistvgenre = await GET_ASYNC('tvgenre');
		if(redistvgenre){
			return res.json(JSON.parse(redistvgenre));
		}		
		const {data} = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API}&language=en-US`);
		if(data.genres){
			await SET_ASYNC('tvgenre',JSON.stringify(data.genres),'EX',60*60*24);
			res.json(data.genres);
		}else{
			return res.json({msg:'Failed to fetch genres'});
		}
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}

const genreMovies = async(req,res) =>{
	try {
		const page = parseInt(req.query.page);
		const {genreforURL} = req.body;
		const {data} = await axios.get(`
			https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
			`);
		res.json({
			results:data.results,
			pages:data.total_pages
		})
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}

const tvShows = async(req,res) =>{
	try {
		const page = parseInt(req.query.page);
		const {genreforURL} = req.body;
		const {data} = await axios.get(`
			https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
			`);
		res.json({
			results:data.results,
			pages:data.total_pages
		})		
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}

module.exports = {
	getMovieCategory,
	getTvCategory,
	genreMovies,
	tvShows
}
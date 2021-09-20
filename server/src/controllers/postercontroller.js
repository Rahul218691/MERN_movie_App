const axios = require('axios');
const {GET_ASYNC,SET_ASYNC} = require('../helpers/redis.helper');

const getBannerData = async(req,res) =>{
	try{
		const randomMoviePage = Math.floor(Math.random() * 450) + 1;
		const randomTVPage = Math.floor(Math.random() * 90) + 1;
		let posters = [];
		const cacheRedis = await GET_ASYNC('poster');
		if(cacheRedis){
			return res.json(JSON.parse(cacheRedis));
		}
		const response1 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API}&language=en-US&page=${randomMoviePage}`);
		const response2 = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API}&language=en-US&page=${randomTVPage}`);
		if(response1.data.results){
		let filtereddata1 = response1.data.results.filter(list=>list.backdrop_path !==null)
		.map((data)=>{
			return{
				adult:data.adult,
				posterimg:data.backdrop_path,
				orginal_title:data.original_title,
				overview:data.overview,
				id:data.id,
				title:data.title
			}
		}).splice(0,2);		
		posters = [...posters,...filtereddata1];
		}
		if(response2.data.results){
		let filtereddata2 = response2.data.results.filter(list=>list.backdrop_path !==null)
		.map((data)=>{
			return{
				adult:data.adult ? data.adult : null,
				posterimg:data.backdrop_path,
				orginal_title:data.original_title ? data.original_title : data.original_name,
				overview:data.overview,
				id:data.id,
				title:data.name
			}
		}).splice(0,2);	
		posters = [...posters,...filtereddata2];			
		}
		await SET_ASYNC('poster',JSON.stringify(posters),'EX',60*60*24);	
		res.json(posters);
	}catch(error){
		return res.status(500).json({msg:error.message})
	}
}



const getMovieBanners = async(req,res) =>{
	try{
		const {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API}&language=en-US&page=1`);
		let posters=[];
		const cacheRedisMovies = await GET_ASYNC('moviesposter');
		if(cacheRedisMovies){
			return res.json(JSON.parse(cacheRedisMovies));
		}		
		if(data.results){
			let filterResult = data.results.filter(result=> result.backdrop_path !== null && result.poster_path !== null)
			.map((movie)=>{
				return{
					adult:movie.adult,
					posterimg:movie.backdrop_path,
					orginal_title:movie.orginal_title,
					overview:movie.overview,
					id:movie.id,
					title:movie.title
				}
			}).splice(0,4);
			posters = [...posters,...filterResult];
			await SET_ASYNC('moviesposter',JSON.stringify(posters),'EX',60*60*24);	
			res.json(posters);
		}else{
			return res.json({msg:'No data found'});
		}
	}catch(error){
		return res.status(500).json({msg:error.message})
	}
}


const getTvBanners = async(req,res) =>{
	try{
		const {data} = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.TMDB_API}&language=en-US&page=1`);
		let posters=[];
		const cacheRedisTV = await GET_ASYNC('tvposter');
		if(cacheRedisTV){
			return res.json(JSON.parse(cacheRedisTV));
		}		
		if(data.results){
			let filterResult = data.results.filter(result=> result.backdrop_path !== null && result.poster_path !== null)
			.map((tv)=>{
				return{
					adult:tv.adult ? tv.adult : null,
					posterimg:tv.backdrop_path,
					orginal_title:tv.original_name,
					overview:tv.overview,
					id:tv.id,
					title:tv.name
				}
			}).splice(0,4);
			posters = [...posters,...filterResult];
			await SET_ASYNC('tvposter',JSON.stringify(posters),'EX',60*60*24);	
			res.json(posters);
		}else{
			return res.json({msg:'No data found'});
		}
	}catch(error){
		return res.status(500).json({msg:error.message})
	}
}



module.exports = {
	getBannerData,
	getMovieBanners,
	getTvBanners
}
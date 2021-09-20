const axios = require('axios');


const getTrending = async(req,res) =>{
	try {
		const page = parseInt(req.query.page);
		const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API}&page=${page}`);
		const filterdata = data.results.filter(data=>data.poster_path !==null);
		res.json({
			trending:filterdata,
			totalpages:data.total_pages,
			results:data.total_results
		});
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


const searchData = async(req,res) =>{
	try {
		const page = parseInt(req.query.page);
		const {tab,search} = req.body;
		const {data} = await axios.get(`https://api.themoviedb.org/3/search/${tab}?api_key=${process.env.TMDB_API}&page=${page}&query=${search}
			&include_adult=false`);
		res.json({
			results:data.results,
			pages:data.total_pages,
			type:tab
		});
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


const showDetails = async(req,res) =>{
	try {
		const {id,type} = req.params;
		const {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API}&language=en-US`);
		const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.TMDB_API}&language=en-US`);
		const videourl = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API}&language=en-US`)
		const dataobj = {
			posterimg:data.poster_path,
			title:data.original_title ? data.original_title : data.original_name,
			released:data.release_date ? data.release_date : data.first_air_date,
			rating:data.vote_average,
			genres:data.genres,
			video:data.video ? data.video : null,
			cast:response.data.cast.length > 3 ? response.data.cast : [],
			crew:response.data.crew.length > 3 ? response.data.crew : [],
			overview:data.overview,
			url:videourl.data.results[0] ? videourl.data.results[0].key : null
		}
		res.json(dataobj);
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


module.exports = {
	getTrending,
	searchData,
	showDetails
}
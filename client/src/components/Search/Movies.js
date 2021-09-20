import React,{useEffect} from 'react';
import {PosterCard} from '../index';

const Movies = ({movies,search,dispatch,postDataAPI,tab,page,auth,
setMovies,setTotalMovies,movieloadRef,loadMoreMovies}) =>{


	const getSearch = async() =>{
		const {data} = await postDataAPI(`search?page=${page}`,{tab,search},auth.access_token);
		setMovies(data.results);
		setTotalMovies(data.pages);
	}


	useEffect(()=>{
		if(search){
			getSearch();
		}// eslint-disable-next-line
	},[])	


	useEffect(() =>{
		const observer = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				loadMoreMovies();
			}
		},{threshold:1});
		observer.observe(movieloadRef.current)
		// eslint-disable-next-line		
	},[]);	

	return(
			<div className="movies__container">
				<div className="poster__card">
					{
						movies && movies.length > 0 ?
						movies.map((movie,i) =>(
								<PosterCard key={i} data={movie} media_type="movie"/>
							))
						:null
					}
				</div>

				<div className="text-center">
					<button className="btn" ref={movieloadRef}>Load More</button>
				</div>

			</div>
		)
}

export default Movies;
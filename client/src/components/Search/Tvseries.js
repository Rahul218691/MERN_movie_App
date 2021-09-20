import React,{useEffect} from 'react';
import {PosterCard} from '../index';

const Tvseries = ({series,search,dispatch,postDataAPI,tab,page,auth,
setSeries,setTotalSeries,tvloadRef,loadMoreTv}) =>{


	const getSearch = async() =>{
		const {data} = await postDataAPI(`search?page=${page}`,{tab,search},auth.access_token);
		setSeries(data.results);
		setTotalSeries(data.pages);
	}


	useEffect(()=>{
		if(search){
			getSearch();
		}// eslint-disable-next-line
	},[])


	useEffect(() =>{
		const observer = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				loadMoreTv();
			}
		},{threshold:1});
		observer.observe(tvloadRef.current)
		// eslint-disable-next-line		
	},[]);

	return(
			<div className="series__container">
				<div className="poster__card">
					{
						series && series.length > 0 ?
						series.map((episode,i) =>(
								<PosterCard key={i} data={episode} media_type="tv"/>
							))
						:null
					}
				</div>
				<div className="text-center">
					<button ref={tvloadRef} className="btn">Load More</button>
				</div>		
			</div>
		)
}

export default Tvseries;
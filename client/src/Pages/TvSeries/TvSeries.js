import React,{useEffect,useState,useRef} from 'react';
import './TvSeries.css';
import {useSelector,useDispatch} from 'react-redux';
import {gettvBanners} from '../../redux/actions/tvActions';
import {HomeCarousal,Genre,PosterCard} from '../../components';
import useGenre from '../../hooks/useGenre';
import {postDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';

const Tvseries = () =>{

	const tvloadRef = useRef();
	const {auth,tvseries:{banner}} = useSelector(state=>state);
	const dispatch = useDispatch();
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [page, setPage] = useState(1);
	const [series, setSeries] = useState([]);
	const [numOfPages, setNumOfPages] = useState();
	const genreforURL = useGenre(selectedGenres);

	useEffect(()=>{
		dispatch(gettvBanners(auth));
	},[dispatch,auth]);


	const fetchSeries = async() =>{
		try {
			const {data} = await postDataAPI(`tvgenre?page=${page}`,{genreforURL},auth.access_token);
			setSeries(tv=>[...tv,...data.results]);
			setNumOfPages(data.pages);
		} catch(err) {
			dispatch({
				type:GLOBALTYPES.ALERT,
				payload:{
					error:err.response.data.msg
				}
			})
		}
	}


	const fetchGenreSeries = async() =>{
		try {
			const {data} = await postDataAPI(`tvgenre?page=${page}`,{genreforURL},auth.access_token);
			setSeries(data.results);
			setNumOfPages(data.pages);
		} catch(err) {
			dispatch({
				type:GLOBALTYPES.ALERT,
				payload:{
					error:err.response.data.msg
				}
			})
		}
	}



	useEffect(()=>{
		fetchSeries();
		// eslint-disable-next-line
	},[page]);


	useEffect(()=>{
		fetchGenreSeries();
		// eslint-disable-next-line
	},[genreforURL])



	const loadMore = () =>{
		if(numOfPages !== page){
			setPage(prev=> prev + 1)
		}
	}	

	useEffect(() =>{
		const observer = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				loadMore();
			}
		},{threshold:1});
		observer.observe(tvloadRef.current)
		// eslint-disable-next-line		
	},[]);

	return(
			<div className="tvseries__container">
				<div className="tvseries__poster">
					<HomeCarousal banner={banner}/>
				</div>
				<div className="genre__container">
					<Genre 
					type="tv"
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					genres={genres}
					setGenres={setGenres}
					auth={auth}
					/>
				</div>	
				<div className="poster__card">
					{
						series && series.map((movie,i) =>(
								<PosterCard key={i} data={movie} media_type="tv"/>
							))
					}	
				</div>	
				<div className="text-center">
					<button className="btn" ref={tvloadRef}>Load More</button>
				</div>										
			</div>
		)
}

export default Tvseries;
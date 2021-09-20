import React,{useEffect,useState,useRef} from 'react';
import './Movies.css';
import {useSelector,useDispatch} from 'react-redux';
import {getmovBanners} from '../../redux/actions/movieActions';
import {HomeCarousal,Genre,PosterCard} from '../../components';
import useGenre from '../../hooks/useGenre';
import {postDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';

const Movies = () =>{

	const loadingRef = useRef();
	const {auth,movies:{banner}} = useSelector(state=>state);
	const dispatch = useDispatch();
	const [genres,setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const genreforURL = useGenre(selectedGenres);
	const [page,setPage] = useState(1);
	const [movies,setMovies] = useState([]);
	const [numpages,setNumPages] = useState('');

	useEffect(()=>{
		dispatch(getmovBanners(auth));
	},[dispatch,auth]);


	const fetchMovies = async() =>{
		try {
			const {data} = await postDataAPI(`moviegenre?page=${page}`,{genreforURL},auth.access_token);
			setMovies(mov=>[...mov,...data.results]);
			setNumPages(data.pages);
		} catch(err) {
			dispatch({
				type:GLOBALTYPES.ALERT,
				payload:{
					error:err.response.data.msg
				}
			})
		}
	}

	const fetchGenreMovies = async() =>{
		try {
			const {data} = await postDataAPI(`moviegenre?page=${page}`,{genreforURL},auth.access_token);
			setMovies(data.results);
			setNumPages(data.pages);
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
		fetchMovies();
		// eslint-disable-next-line
	},[page]);

	useEffect(()=>{
		fetchGenreMovies();
		// eslint-disable-next-line
	},[genreforURL])


	const loadMore = () =>{
		if(numpages !== page){
			setPage(prev=> prev + 1)
		}
	}	

	useEffect(() =>{
		const observer = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				loadMore();
			}
		},{threshold:1});
		observer.observe(loadingRef.current)
		// eslint-disable-next-line		
	},[]);

	return(
			<div className="movies__container">
				<div className="movies__poster">
					<HomeCarousal banner={banner}/>
				</div>
				<div className="genre__container">
					<Genre 
					type="movie"
					genres={genres}
					setGenres={setGenres}
					auth={auth}
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					setPage={setPage}
					/>
				</div>
				<div className="poster__card">
					{
						movies && movies.map((movie,i) =>(
								<PosterCard key={i} data={movie} media_type="movie"/>
							))
					}	
				</div>
				<div className="text-center">
					<button className="btn" ref={loadingRef}>Load More</button>
				</div>				
			</div>
		)
}

export default Movies;
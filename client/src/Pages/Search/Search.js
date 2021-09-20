import React,{useState,useRef,useEffect} from 'react';
import './Search.css';
import { FaSearch } from "react-icons/fa";
import {Movies,TvSeries} from '../../components';
import {postDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {useDispatch,useSelector} from 'react-redux';


const Search = () =>{

	const movieloadRef = useRef();
	const tvloadRef = useRef();
	const {auth} = useSelector(state=>state);
	const dispatch = useDispatch();
	const [tab,setTab] = useState('movie');
	const [search,setSearch] = useState('');
	const [page,setPage] = useState(1);
	const [movies,setMovies] = useState([]);
	const [series,setSeries] = useState([]);
	const [totalSeries,setTotalSeries] = useState('');
	const [totalmovies,setTotalMovies] = useState('');

	const handleSearch = async() =>{
		try {
			if(!search) return;
			setPage(1)
			const {data} = await postDataAPI(`search?page=${page}`,{tab,search},auth.access_token);
			if(data.type === 'movie'){
				setMovies(data.results);
				setTotalMovies(data.pages);
			}else{
				setSeries(data.results);
				setTotalSeries(data.pages);
			}
		} catch(err) {
			dispatch({
				type:GLOBALTYPES.ALERT,
				payload:{
					error:err.response.data.msg
				}
			})
		}
	}

	const loadMoreMovies = () =>{
		if(!search) return;
		if(totalmovies === page) return;
		setPage(prev=> prev + 1)
	}	

	const loadMoreTv = () =>{
		if(!search) return;
		if(totalSeries === page) return;
		setPage(prev=> prev + 1)
	}	


	const fetchLoadedResult = async() =>{
		try {
			if(!search) return;
			const {data} = await postDataAPI(`search?page=${page}`,{tab,search},auth.access_token);
			if(data.type === 'movie'){
				setMovies(mov=>[...mov,...data.results]);
				setTotalMovies(data.pages);
			}else{
				setSeries(tv=>[...tv,...data.results]);
				setTotalSeries(data.pages);
			}
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
		fetchLoadedResult();
		// eslint-disable-next-line		
	},[page])


	return(
			<div className="search__container container">
				<div className="search__input">
					<input type="text"
					placeholder="search..."
					className="form-control"
					value={search}
					onChange={(e)=>setSearch(e.target.value)}/>
					<button className="btn" onClick={handleSearch}><FaSearch /></button>
				</div>
				<div className="search__tabs">
					<span onClick={()=>setTab('movie')} className={`${tab === 'movie' ? 'active' : ''}`}>SEARCH MOVIES</span>
					<span onClick={()=>setTab('tv')} className={`${tab === 'tv' ? 'active' : ''}`}>SEARCH TV SERIES</span>
				</div>
				<div className="search__contents">
					{
						tab === "movie" ?
						<Movies movies={movies} search={search}
						dispatch={dispatch}
						postDataAPI={postDataAPI}
						tab={tab}
						page={page}
						auth={auth}
						setMovies={setMovies}
						setTotalMovies={setTotalMovies}
						movieloadRef={movieloadRef}
						loadMoreMovies={loadMoreMovies}
						/>
						:<TvSeries series={series} search={search}
						dispatch={dispatch}
						postDataAPI={postDataAPI}
						tab={tab}
						page={page}
						auth={auth}
						setSeries={setSeries}
						setTotalSeries={setTotalSeries}
						tvloadRef={tvloadRef}
						loadMoreTv={loadMoreTv}
						/>
					}
				</div>
			</div>
		)
}

export default Search;
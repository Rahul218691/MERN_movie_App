import React,{useState,useRef,useEffect} from 'react';
import './Home.css';
import {PosterCard,HomeCarousal} from '../../components';
import {useSelector,useDispatch} from 'react-redux';
import {getTrending} from '../../redux/actions/homeActions';

const Home = () =>{

	const loadRef = useRef();
	const dispatch = useDispatch();
	const {home:{trending,banner,page},auth} = useSelector(state=>state);
	const [currentPage,setCurrentPage] = useState(1);

	useEffect(() =>{
		const observer = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting){
				loadMore();
			}
		},{threshold:1});
		observer.observe(loadRef.current)
		// eslint-disable-next-line		
	},[]);

	useEffect(()=>{
		dispatch(getTrending(auth,currentPage))
	},[currentPage,dispatch,auth])

	const loadMore = () =>{
		if(page !== currentPage){
			setCurrentPage(prev=> prev + 1)
		}
	}

	return(
			<div className="home">
				<div className="home__poster">
					<HomeCarousal banner={banner}/>
				</div>
				<span className="home__title">Trending Today</span>
				<div className="poster__card">
					{
						trending && trending.map((trend,i) =>(
								<PosterCard key={i} data={trend}/>
							))
					}																								
				</div>
				<div className="text-center">
					<button className="btn" ref={loadRef}>Load More</button>
				</div>
			</div>
		)
}

export default Home;
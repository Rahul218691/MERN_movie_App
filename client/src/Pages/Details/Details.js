import React,{useEffect,useState} from 'react';
import './Details.css';
import {Row,Col} from 'react-bootstrap';
import {img_500,unavailable} from '../../config/config';
import { FaYoutube } from "react-icons/fa";
import {useParams,useLocation} from 'react-router-dom';
import {getDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {useSelector,useDispatch} from 'react-redux';
import {CreditsCarousal} from '../../components';
import YouTube from 'react-youtube';

const useQuery = () =>{
	return new URLSearchParams(useLocation().search);
}

const Details = () =>{

	const {auth} = useSelector(state=>state);
	const dispatch = useDispatch();
	const [details,setDetails] = useState();
	const [videoshow,setVideoShow] = useState(false);

	let query = useQuery();
	const {id} = useParams();
	const media_type = query.get('media_type');

	const fetchdata = async(id,media_type) =>{
		try {
			dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
			const {data} = await getDataAPI(`details/${id}/${media_type}`,auth.access_token);
			setDetails(data);
			dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
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
		fetchdata(id,media_type)
		// eslint-disable-next-line
	},[id,media_type])

	return(
			<div className="details__container p-2">
				<Row>
					<Col md={4}>
						<img 
						src={details?.posterimg ? `${img_500}${details.posterimg}` : unavailable}
						alt=""
						className="img-fluid"
						/>
					</Col>
					<Col md={8}>
						<h1 className="text-center text-uppercase">{details?.title}</h1>
						<p className="text-center mb-0">Released On: {details?.released}</p>
						<p className="text-center mb-0">Vote Average <span className={`badge badge-pill ${details?.rating < 5 ? 'badge-danger' : 'badge-primary'}`}>{details?.rating}</span></p>
						<div className="genre__details">
							{
								details && details?.genres?.map((genre) =>(
									<span key={genre.id} className="badge badge-pill badge-secondary">{genre.name}</span>
								))
							}
						</div>
						<div className="overview__container"> 
							<p>{details?.overview}</p>
						</div>
						<div className="carousal__container mt-1">
							{
								details && details.cast.length > 0 ?(
								<div className="carousal__cast">
									<h5>CAST</h5>
									<CreditsCarousal credits={details?.cast}/>
								</div>
									)
									:null
							}
							{
								details && details.crew.length > 0 ?(
								<div className="carousal__crew">
									<h5>CREW</h5>
									<CreditsCarousal credits={details?.crew}/>
								</div>
								)
								:null
							}							
						</div>
						{
							details?.url &&
							(
								<div className="watch__button mt-2">
									<button className="btn btn-block btn-danger" onClick={()=>setVideoShow(!videoshow)}><span className="icon__youtube"><FaYoutube /></span><span> {!videoshow ? 'Watch' : 'hide'}</span></button>
								</div>
							)
						}
						{
							videoshow && (
								<YouTube 
									videoId={details.url}
									className="video__container"
								/>
								)
						}
					</Col>
				</Row>
			</div>
		)
}

export default Details;
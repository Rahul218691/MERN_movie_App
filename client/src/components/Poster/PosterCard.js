import React from 'react';
import './PosterCard.css';
import { FaStar } from "react-icons/fa";
import {img_300,unavailable} from '../../config/config';
import {useHistory} from 'react-router-dom';

const PosterCard = ({data,media_type}) =>{

	const history = useHistory();

	const handlePush = (data) =>{
		if(data){
			history.push(`/details/${data.id}?media_type=${data.media_type? data.media_type : media_type}`)
		}
	}

	return(
			<div className="main__post__card" onClick={()=>handlePush(data)}>
				<span className={`badge ${data.vote_average < 5 ? 'badge-danger' : 'badge-success'}`}>{data.vote_average} <FaStar className="star__icon"/></span>
				<img src={data.poster_path ? `${img_300}${data.poster_path}` : unavailable} alt=""/>
				<b className="post__title">{data.title ? data.title : data.name}</b>
				<span className="post__subtitle">
					{data.media_type === 'movie' ? 'Movie' : 'TV'}
					<span className="">{data.release_date ? data.release_date : data.first_air_date}</span>
				</span>
			</div>
		)
}

export default PosterCard;
import React from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import './CreditsCarousal.css';


const handleDragStart = (e) => e.preventDefault();

const CreditsCarousal = ({credits}) =>{

	  const items = credits.map((c) => (
	    <div className="carouselItem">
	      <img
	        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
	        alt={c?.name}
	        onDragStart={handleDragStart}
	        className="carouselItem__img"
	      />
	      <b className="carouselItem__txt">{c?.name}</b>
	    </div>
	  ));	

	  const responsive = {
	    0: {
	      items: 3,
	    },
	    512: {
	      items: 5,
	    },
	    1024: {
	      items: 7,
	    },
	  };

return(
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
	)
}

export default CreditsCarousal;
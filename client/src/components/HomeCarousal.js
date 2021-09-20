import React,{useState} from 'react';
import {Carousel} from 'react-bootstrap';
import {poster} from '../config/config';

const HomeCarousal = ({banner}) =>{

	const [index, setIndex] = useState(0);

	  const handleSelect = (selectedIndex, e) => {
	    setIndex(selectedIndex);
	  };

	return(
		    <Carousel activeIndex={index} onSelect={handleSelect}>
		    {
		    	banner && banner.map((ban,i) =>(
					      <Carousel.Item key={i}>
					        <img
					          className="d-block w-100"
					          src={`${poster}${ban.posterimg}`}
					          alt="First slide"
					        />
					        <Carousel.Caption>
					          <h3>{ban.title}</h3>
					          <p className="banner__overview">{ban.overview}</p>
					        </Carousel.Caption>
					      </Carousel.Item>
		    		))
		    }
		    </Carousel>
		)
}


export default HomeCarousal;
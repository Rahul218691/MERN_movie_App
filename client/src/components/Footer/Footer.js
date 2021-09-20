import React from 'react';
import './Footer.css';
import { MdMovie,MdTv,MdSearch,MdHome } from "react-icons/md";
import {Link,withRouter} from 'react-router-dom';

const currentTab = (history,path) =>{
	if(history.location.pathname === path){
		return {color:"#2ecc72"}
	}else{
		return {color:"#FFFFFF"}
	}
}

const Footer = ({history}) =>{
	return(
			<div className="footer__navigations">
				<Link to='/home'><MdHome style={currentTab(history,'/home')} className="footer__nav__icons"/></Link>
				<Link to='/movies'><MdMovie style={currentTab(history,'/movies')} className="footer__nav__icons"/></Link>
				<Link to='/tvepisodes'><MdTv style={currentTab(history,'/tvepisodes')} className="footer__nav__icons"/></Link>
				<Link to='/search'><MdSearch style={currentTab(history,'/search')} className="footer__nav__icons"/></Link>
			</div>
		)
}

export default withRouter(Footer);
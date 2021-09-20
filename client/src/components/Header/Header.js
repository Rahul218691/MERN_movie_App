import React from 'react';
import './Header.css';
import Logo from '../../images/Video2000.png';
import { FaUserAlt } from "react-icons/fa";
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/authActions';


const Header = () =>{

	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state);

	return(
			<div className="header">
				<img src={Logo} alt="" className="img-fluid header__image" 
				onClick={()=>window.scroll(0,0)}/>
				<div className="user__icon">
					{
						auth && (
							<Dropdown className="dropleft">
							  <Dropdown.Toggle id="dropdown-basic">
							    <FaUserAlt className="icon__user"/>
							  </Dropdown.Toggle>
							  <Dropdown.Menu>						  
							    <Link className="dropdown-item" to='/' onClick={()=>dispatch(logout())}>Logout</Link>
							  </Dropdown.Menu>
							</Dropdown>
							)
					} 			
					{
						!auth && (
							<>
								<Link to='/' className="header__links active">Login</Link>
							</>
						)
					}	
				</div>
			</div>
		)
}

export default Header;

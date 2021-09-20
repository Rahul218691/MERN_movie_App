import React from 'react';
import './Login.css';
import Logo from '../../images/Video2000.png';
import {GoogleButton} from '../../components';

const Login = () =>{
	return(
			<div className="login__main">
				<div className="auth__card">
					<h5>Welcome To</h5>
					<img src={Logo} alt="" className="img-fluid auth__logo"/>
					<GoogleButton text="oogle Login"/>
				</div>	
			</div>
		)
}

export default Login;

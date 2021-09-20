import React from 'react'
import {GoogleLogin} from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import {useDispatch} from 'react-redux';
import {googleAuth} from '../redux/actions/authActions';

const GoogleButton = ({text}) => {

    const dispatch = useDispatch();

    const responseSuccess = (response) =>{
         if(response){
             dispatch(googleAuth(response.tokenId))
         }
    }

    const responseError = (response) =>{
        console.log(response)
    }

    return (
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        render={renderProps => (
            <button className="btn btn-block gbtn" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle /> <span>{text}</span></button>
          )}
        buttonText="Login"
        onSuccess={responseSuccess}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
      />
    )
}

export default GoogleButton

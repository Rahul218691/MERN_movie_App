import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
 
const  AuthRoute = ({ component:Component, ...rest }) =>{

  const {auth} = useSelector(state=>state);

  return (
    <Route
      {...rest}
      render={ props =>
        !auth ? (
         <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
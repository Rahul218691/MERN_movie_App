import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
 
const  PrivateRoute = ({ component:Component, ...rest }) =>{

  const {auth} = useSelector(state=>state);

  return (
    <Route
      {...rest}
      render={ props =>
        auth ? (
         <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
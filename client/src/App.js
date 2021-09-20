import React,{useEffect} from 'react';
import {BrowserRouter,Switch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Header,Footer,Alert} from './components';
import {Home,Login,Search,Movies,TvSeries,Details} from './Pages';
import {useSelector,useDispatch} from 'react-redux';
import PrivateRoute from './customRoutes/PrivateRoute';
import AuthRoute from './customRoutes/AuthRoute';
import {getBanners,getTrending} from './redux/actions/homeActions';

const App =() => {

  const dispatch = useDispatch();
  const {auth} = useSelector(state=>state);

  useEffect(()=>{
    if(auth){
      dispatch(getBanners(auth));
      dispatch(getTrending(auth,1));
    }
  },[auth,dispatch])

  return (
    <BrowserRouter>
      <Header />
      <Alert />
      <div className="app">
        <Container fluid>
            <Switch>
                <AuthRoute path='/' exact component={Login}/>
                <PrivateRoute path='/home' exact component={Home}/>
                <PrivateRoute path='/search' exact component={Search}/>
                <PrivateRoute path='/movies' exact component={Movies}/>
                <PrivateRoute path='/tvepisodes' exact component={TvSeries}/>
                <PrivateRoute path='/details/:id' exact component={Details}/>
            </Switch>
        </Container>
      </div>
      {auth && <Footer />}
    </BrowserRouter>
  );
}

export default App;

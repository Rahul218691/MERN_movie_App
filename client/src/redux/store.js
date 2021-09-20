import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

import {composeWithDevTools} from 'redux-devtools-extension';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null



const initialState = {
  auth:userInfoFromStorage
}


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
  )

const DataProvider = ({children}) =>{
  return(
    <Provider store={store}>
      {children}
    </Provider>
    )  
}

export default DataProvider;
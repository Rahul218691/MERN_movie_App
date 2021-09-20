import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const Alert = () =>{

	const {alert} = useSelector(state=>state);
	const dispatch = useDispatch();

	return(
			<div>
				{alert.loading && <Loading />}
				{alert.error && 
					<Toast
					 msg={{title:'Failed',body:alert.error}} 
					 bgColor="bg-danger"
					  handleShow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
					 />
				}
				{alert.success &&
					 <Toast msg={{title:'Success',body:alert.success}}
					 bgColor="bg-success"
					 handleShow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
					 />
				}
			</div>
		)
}

export default Alert;
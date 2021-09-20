import {GLOBALTYPES} from './globalTypes';
import {postDataAPI} from '../../utils/fetchData';



export const googleAuth = (tokenId) => async(dispatch) =>{
	try {
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
		const res = await postDataAPI('auth',{tokenId});
		dispatch({
			type:GLOBALTYPES.AUTH,
			payload:{
				access_token:res.data.access_token,
				user:res.data.user
			}
		});
		localStorage.setItem('userInfo', JSON.stringify(res.data));
		dispatch({
			type:GLOBALTYPES.ALERT,
			payload:{
				success:res.data.msg
			}
		});
	} catch(err) {
		dispatch({
			type:GLOBALTYPES.ALERT,
			payload:{
				error:err.response.data.msg
			}
		})
	}
}

export const logout = () => async(dispatch)=>{
	try {
		localStorage.removeItem('userInfo');
		window.location.href='/';
	} catch(err) {
		dispatch({
			type:GLOBALTYPES.ALERT,
			payload:{
				error:err.response.data.msg
			}
		})		
	}
} 
import {getDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from './globalTypes';



export const TVTYPES = {
	GET_TV_BANNERS:"GET_TV_BANNERS",
	GET_TVSERIES:"GET_TVSERIES"
}


export const gettvBanners = (auth) => async(dispatch) =>{
	try {
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
		const res = await getDataAPI('tvposter',auth.access_token);
		dispatch({
			type:TVTYPES.GET_TV_BANNERS,
			payload:res.data
		});
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
	} catch(err) {
		dispatch({
			type:GLOBALTYPES.ALERT,
			payload:{
				error:err.response.data.msg
			}
		})			
	}
}
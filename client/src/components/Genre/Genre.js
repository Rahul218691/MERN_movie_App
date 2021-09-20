import React,{useEffect} from 'react';
import {getDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {useDispatch} from 'react-redux';

const Genre = ({genres,setGenres,type,auth,selectedGenres,
setSelectedGenres}) =>{

	const dispatch = useDispatch();

	const fetchGenres = async() =>{
		if(type === 'movie'){
		try {
			const {data} = await getDataAPI('moviegenre',auth.access_token);
			if(data){
				setGenres(data);
			}			
		} catch(err) {
			dispatch({
				type:GLOBALTYPES.ALERT,
				payload:{
					error:err.response.data.msg
				}
			})
		}			
		}else{
			try {
				const {data} = await getDataAPI('tvgenre',auth.access_token);
				if(data){
					setGenres(data);
				}			
			} catch(err) {
				dispatch({
					type:GLOBALTYPES.ALERT,
					payload:{
						error:err.response.data.msg
					}
				})
			}			
		}
	}

	useEffect(()=>{
		fetchGenres();
		return ()=>{
			setGenres([]);
 		}// eslint-disable-next-line
	},[]);

	const handleAddGenre = (genre) =>{
		setSelectedGenres([...selectedGenres,genre]);
		setGenres(genres.filter((g)=>g.id !== genre.id));
	}


	const handleRemoveGenre = (genre) =>{
		setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
		setGenres([...genres,genre]);
	}

	return(
			<div style={{padding:'6px 0'}}>
				{
					selectedGenres.map((genre)=>(
							<span 
								style={{margin:'2px',cursor:'pointer',fontSize:'16px'}}
								key={genre.id}
								className="badge badge-pill badge-primary"
								onClick={()=>handleRemoveGenre(genre)}>
								{genre.name}
							</span>						
						))
				}
				{
					genres.map((genre) =>(
							<span 
								style={{margin:'2px',cursor:'pointer',fontSize:'16px'}}
								key={genre.id}
								className="badge badge-pill badge-secondary"
								onClick={()=>handleAddGenre(genre)}>
								{genre.name}
							</span>
						))
				}
			</div>
		)
}

export default Genre;
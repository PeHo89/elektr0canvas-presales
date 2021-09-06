import {
	FETCH_FRAMES,
} from './constants';
import axios from 'axios';

export function getFrames() {
  return async dispatch => {
		axios.get(`${process.env.REACT_APP_API_URL}/get_frames`)
		.then(res => {
			const frames = res.data;
			dispatch({ type: FETCH_FRAMES, payload: frames });
		})
		.catch(error => {
			console.log("error");
		});
  };
}
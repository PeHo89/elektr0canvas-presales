import {
	FETCH_FRAMES
} from '../actions/constants';

const initialState = {
	frames: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_FRAMES:
			return {
				frames: action.payload.frames
			};

		default:
			return state;
	}
}

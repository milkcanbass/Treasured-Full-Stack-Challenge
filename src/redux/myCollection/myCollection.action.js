import { ADD_PICTURE } from './myCollection.types';

export const addPicture = (payload) => async (dispatch) => {
  dispatch({ type: ADD_PICTURE, payload });
};

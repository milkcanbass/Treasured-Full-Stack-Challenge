import { FETCH_PICTURES, ADD_PICTURE } from './data.types';
import { privateKey } from '../../../key';

export const fetchPictures = (searchWord) => async (dispatch) => {
  const url = `https://pixabay.com/api/?key=${privateKey}&q=${searchWord}&image_type=photo&pretty=true`;
  try {
    const pictures = [];
    const response = await fetch(url);
    const data = await response.json();

    dispatch({ type: FETCH_PICTURES, payload: data.hits });
  } catch (err) {
    alert(err);
  }
};

export const addPicture = (id, tags) => async (dispatch) => {
  dispatch({ type: ADD_PICTURE, payload: { id, tags } });
};

import { FETCH_PICTURES, ADD_PICTURE } from './data.types';

const INITIAL_STATE = { pictures: [] };

const dataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PICTURES:
      return {
        pictures: payload,
      };
    case ADD_PICTURE:
      return {
        pictures: state.pictures.map((picture) => {
          if (picture.id !== payload.id) {
            return picture;
          }
          return {
            ...picture,
            tags: [...payload.tags],
          };
        }),
      };

    default:
      return state;
  }
};

export default dataReducer;

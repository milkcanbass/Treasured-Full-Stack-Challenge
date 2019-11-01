import { ADD_PICTURE } from './myCollection.types';

const INITIAL_STATE = { myCollection: [] };

const myCollectionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PICTURE:
      if (state.myCollection.length === 0) {
        return {
          myCollection: [payload],
        };
      }
      const newMyCollection = [];
      state.myCollection.map((picture) => {
        if (picture.largeImageURL.includes(payload.largeImageURL)) {
          return null;
        }
        newMyCollection.push(picture);
      });
      newMyCollection.push(payload);
      return {
        ...state,
        myCollection: [...newMyCollection],
      };
    default:
      return state;
  }
};

export default myCollectionReducer;

import { combineReducers } from 'redux';

import dataReducer from './data/data.reducer';
import myCollectionReducer from './myCollection/myCollection.reducer';

const rootReducer = combineReducers({
  data: dataReducer,
  myCollection: myCollectionReducer,
});

export default rootReducer;

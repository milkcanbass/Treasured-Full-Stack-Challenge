import { createSelector } from 'reselect';

const selectMyCollectionReducer = (state) => state.myCollection;

export const selectMyCollection = createSelector(
  [selectMyCollectionReducer],
  (data) => data.myCollection,
);

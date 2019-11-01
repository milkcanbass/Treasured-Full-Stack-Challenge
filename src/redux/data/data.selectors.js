import { createSelector } from 'reselect';

const selectDataReducer = (state) => state.data;

export const selectPictures = createSelector(
  [selectDataReducer],
  (data) => data.pictures,
);

import { createSelector } from 'reselect';

const selectUser = state => state.user;



export const selectuser = createSelector(
    [selectUser],
    user => user.user
)
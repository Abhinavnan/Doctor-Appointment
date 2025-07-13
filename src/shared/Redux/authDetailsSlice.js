import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    login: false,
    appoinmentDetails: [],
};

const authDetails = createSlice({
    name: 'authDetails',
    initialState,
    reducers: {
        updateAuthDetails: (state, action) => {
            return {...state, ...action.payload};
        },
        resetAuthDetails: () => initialState
    }
});

export const {updateAuthDetails, resetAuthDetails} = authDetails.actions;
export default authDetails.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
 
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
    addUsers(state, action) {
      state.value = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addUsers
} = slice.actions;


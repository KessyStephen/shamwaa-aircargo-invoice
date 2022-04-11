import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  batchNumber: ''
 
};

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    
    addInvoiceData(state, action) {
      state.value = action.payload;
    },
    addDispatchNumber(state, action) {
      state.batchNumber = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addInvoiceData,
  addDispatchNumber
} = slice.actions;


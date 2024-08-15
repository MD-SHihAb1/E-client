import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  categories: string[];  // Make sure this is an array
}

const initialState: ProductState = {
  categories: [],  // Initialize as an empty array
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategories } = productSlice.actions;
export default productSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../models/CartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    reduceFromCart(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(item => item._id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem) {
        state.items = state.items.filter(item => item._id !== action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      console.log("removeFromCart called with:", action.payload); // Debugging log
      state.items = state.items.filter(item => item._id !== action.payload);
      console.log("Updated cart items:", state.items); // Debugging log
    },
  },
});

export const { addToCart, reduceFromCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    info: JSON.parse(localStorage.getItem("cartData")) || [],
  },
  reducers: {
    addToCart: (state, actions) => {
      const info = actions.payload;
      state.info = info;
      localStorage.setItem("cartData", JSON.stringify(state.info));
    },
    removeFromCart: (state, actions) => {
      state.info = actions.payload;
    },
    removeAll: (state) => {
      state.info = [];
      localStorage.removeItem("cartData");
    },
  },
});
export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;
export default cartSlice.reducer;

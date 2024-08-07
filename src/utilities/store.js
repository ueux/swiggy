import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "./toogle-slice";
import cartSlice from "./cart-slice";
import filterSplice from "./filter-splice";
import authSlice from "./auth-slice";
import diffResSlice from "./dif-res"
import resultsSlice from "./search-slice"

const store = configureStore({
  reducer: {
    ToogleSlice: toogleSlice,
    cartSlice,
    filterSplice,
    authSlice,
    diffResSlice,
    resultsSlice,
  },
});

export default store;

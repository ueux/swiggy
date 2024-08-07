import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    addUserData: (state, actions) => {
          state.userData = actions.payload;
          localStorage.setItem('userData',JSON.stringify(actions.payload))
    },
      removeUserData: (state) => {
          state.userData = null
          localStorage.removeItem('userData')
    },
  },
});
export const { addUserData, removeUserData } = authSlice.actions;
export default authSlice.reducer;

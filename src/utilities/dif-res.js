import { createSlice } from "@reduxjs/toolkit";

const diffResSlice = createSlice({
  name: "diffResSlice",
  initialState: {
      isDiffRes: false,
      firstItem:{}
  },
  reducers: {
    setIsDiffRes: (state, actions) => {
      state.isDiffRes = actions.payload;
      },
      setFirtItem: (state, actions) => {
          state.firstItem=actions.payload
      }
  },
});
export const { setIsDiffRes,setFirtItem } = diffResSlice.actions;
export default diffResSlice.reducer;

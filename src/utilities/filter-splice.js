import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "FilterSplice",
    initialState: {
        filterVal:null,
    },
    reducers: {
        setFilterVal: (state, actions) => {
            state.filterVal=actions.payload
        }
    },
})
export const {setFilterVal }=filterSlice.actions
export default filterSlice.reducer
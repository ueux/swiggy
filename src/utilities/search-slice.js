import { createSlice } from "@reduxjs/toolkit";

const resultsSlice = createSlice({
    name: "Result",
    initialState: {
        results:[]
    },
    reducers: {
        setResults: (state, actions) => {
            state.results=actions.payload
         }
    }
})
export const { setResults } = resultsSlice.actions
export default resultsSlice.reducer
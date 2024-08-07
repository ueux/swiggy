import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name: "Toogle",
    initialState: {
        searchToogle: false,
        signinToggle: false,
        moreDishesToggle: {
            status: false,
            URLkeys: {
                itemName:"",
                city: "",
                resLocation: "",
                resId: "",
                itemId:"",
            }
        }
    },
    reducers: {
        toogleSearchBar: (state,actions) => {
            state.searchToogle=!state.searchToogle
        },
        toogleSignIn: (state,actions) => {
            state.signinToggle=!state.signinToggle
        },

        toggleMoreDishes: (state,actions) => {
            state.moreDishesToggle.status=!state.moreDishesToggle.status
        },
        setURLkeys: (state,actions) => {
            state.moreDishesToggle.URLkeys=actions.payload
        },
    },
})
export const {toogleSearchBar,toogleSignIn,setURLkeys,toggleMoreDishes} =toogleSlice.actions
export default toogleSlice.reducer
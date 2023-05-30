import { createSlice } from '@reduxjs/toolkit'

export const reduxSlice = createSlice({
    name: "redux",

    initialState: {
        userAuthStatus: false,
        refreshCountValue: 0,
        error: null
    },

    reducers: {
        //^ Manages auth status through the application
        authStatus: (state) => {
            if(localStorage.getItem('goose-reloaded-user')){
                return {
                    ...state,
                    userAuthStatus: true
                }
            }

            if(!localStorage.getItem('goose-reloaded-user')){
                return {
                    ...state,
                    userAuthStatus: false
                }

            }
        },

        //^ Handles loggin out the user.
        logoutRedux: (state) => {
            window.location.assign("/auth/login") //^ when the user logs out their will be sent to the logout page
            localStorage.removeItem("goose-reloaded-user") //^ Removes JWT from local storage

            //^ Updates the state 
            return {
                ...state,
                userAuthStatus: false
            }

        },
        refreshCount: (state) => {
            // state.refreshCountValue = state.refreshCountValue + 1
            return {
                ...state,
                refreshCountValue: state.refreshCountValue + 1
            }
            console.log(state.refreshCountValue)
        }

    }
})

export const { authStatus, logoutRedux, refreshCount } = reduxSlice.actions;
export default reduxSlice.reducer
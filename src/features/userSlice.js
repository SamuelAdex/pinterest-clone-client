import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        pending: false,
        error: null
    },
    reducers:{
        regStart: (state)=>{
            state.pending = true
            state.error = null
        },
        regSuccess: (state, action)=>{
            state.pending = false
            state.error = null;
            state.userInfo = action.payload
        },
        regError: (state, action)=>{
            state.pending = false
            state.error = action ? action.payload : null
        },
        logout: (state)=>{
            return {}
        }
    }
})


export const {regStart, regSuccess, regError, logout} = userSlice.actions

export default userSlice.reducer
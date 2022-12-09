import {createSlice} from '@reduxjs/toolkit'


const pinSlice = createSlice({
    name: 'pin',
    initialState:{
        pinObject:{},
        pending: false,
        error: null
    },
    reducers:{
        fetching:(state)=>{
            state.pending = true
        },
        success: (state, action)=>{
            state.pending = false
            state.pinObject = action.payload
            state.error = null
        },
        failed: (state, action)=>{
            state.pending = false
            state.error = action.payload
        }
    }
})

export const {fetching, success, failed} = pinSlice.actions

export default pinSlice.reducer
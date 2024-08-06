import {createSlice} from '@reduxjs/toolkit'

const userslice=createSlice({
        name:'userdetails',
        initialState:{
            user:null
        },
        reducers:{
            getUser:(state,action)=>{
                state.user=action.payload
            },
        }
})
export const {getUser}=userslice.actions;
export default userslice.reducer;
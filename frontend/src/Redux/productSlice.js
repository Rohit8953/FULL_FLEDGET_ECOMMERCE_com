import {createSlice} from '@reduxjs/toolkit'

const productsSlice=createSlice({
    name:'product',
    initialState:{
        AllProducts:[],
        addtocatproduct:[],
        refresher:true
    },
    reducers:{
       getAllProduct:(state,action)=>{
          state.AllProducts=action.payload;
       },
       getrefresher:(state)=>{
          state.refresher=!state.refresher;
       },
       getaddtocartproduct:(state,action)=>{
          state.addtocatproduct=action.payload;
       }
    }
})

export const {getAllProduct,getrefresher,getaddtocartproduct}=productsSlice.actions;
export default productsSlice.reducer;

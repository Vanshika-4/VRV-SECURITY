import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

// const initialState={
//     loading:null,
//     error:null,
//     user:null
    
// }

// const AuthSlice = createSlice({
//     name:"authslice",
//     initialState:initialState,
//     reducers:{
//         SetUser:(state, action)=>{
//             state.user=action.payload
//         }
//     }
// })
// export const {SetUser} = AuthSlice.actions;

// export default AuthSlice.reducer;

export const updateUser = createAsyncThunk('updateuser',async()=>{
    try {
        const request = await get('/api/auth/CheckUser')
        const response = request.data 
        return response;
    } catch (error) {
        throw error
    }
})

const initialState = {
    loading: false,
    error: null,
    user: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload.user;
        },
        Logout:(state)=>{
            state.user=null,
            state.loading=null,
            state.error=null
        } 
    },

    extraReducers:(builder)=>{
        builder.addCase(updateUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = null,
            state.user=action.payload
        })
        builder.addCase(updateUser.rejected,(state)=>{
            state.loading = null,
            state.error=action.error.message,
            state.user=null
        })
    }

})

export const { SetUser, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;

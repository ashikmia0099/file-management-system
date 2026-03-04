import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RegisterData {
    name: string;
    email: string;
    password: string
}


interface ReisterState {
    user: any;
    loading: boolean;
    error: string | null
}


const initialState : ReisterState = {
    user: null,
    loading: false,
    error: null
}


// fetch api 

export const registerUser = createAsyncThunk<any, RegisterData,{rejectValue: string}>(
    "auth/userRegister",
    async (data: RegisterData, { rejectWithValue }) => {
        try {

            const res = await fetch("https://file-management-system-backend.vercel.app/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (!res.ok) {
                return rejectWithValue(result.message)
            };

            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);


const RegisterSlice = createSlice({
    name : "Register",
    initialState,
    reducers : {},
   extraReducers :  (builder) =>{
    builder
    .addCase(registerUser.pending, (state) =>{
        state.loading = true;
        state.error = null
    })
    .addCase(registerUser.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload
    })
    .addCase(registerUser.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload ?? "Something want wrong"
    })
   
   }
})


export  const RegisterReducer = RegisterSlice.reducer
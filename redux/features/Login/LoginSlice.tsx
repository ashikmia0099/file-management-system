import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LoginData {
    email: string;
    password: string
}


interface User {
    id: string;
    name: string;
    email: string
    role: "ADMIN" | "USER"
}

interface LoginState {
    user: any;
    loading: boolean;
    error: string | null
}


// user auto resote from localStorage

const authFromStorage = typeof window !== "undefined" ? localStorage.getItem("auth") : null;


const initialState: LoginState = {
    user: authFromStorage ? JSON.parse(authFromStorage).user : null,
    loading: false,
    error: null
}


// fetch api 

export const LoginUser = createAsyncThunk<
    { token: string; user: User },
    LoginData,
    { rejectValue: string }
>(
    "auth/userLogin",
    async (data: LoginData, { rejectWithValue }) => {
        try {

            const res = await fetch("https://file-management-system-backend.vercel.app/auth/login", {
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


const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout :(state) =>{
            state.user = null;
            state.error = null;
            localStorage.removeItem("auth")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("auth", JSON.stringify(action.payload))
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })

    }
})

export const {logout} = LoginSlice.actions
export const LoginReducer = LoginSlice.reducer
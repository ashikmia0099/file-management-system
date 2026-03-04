import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SubscriptionPackageData {
    PackageName: string;
    MaxFolders: number;
    MaxNestingFolder: number;
    AllowedFileTypes: string[];
    MaxFileSizeMB: number;
    TotalFileLimit: number;
    FilePerFolder: number
}



interface SubscriptionPackageState {
    subscriptionpackage: SubscriptionPackageData | null;
    loading: boolean;
    error: string | null
}


const initialState: SubscriptionPackageState = {
    subscriptionpackage: null,
    loading: false,
    error: null
}



// post api fetch 

export const SubscriptionPackage = createAsyncThunk<SubscriptionPackageData, SubscriptionPackageData, { rejectValue: string }>(
    "package/SubscriptionPackage",
    async (data: SubscriptionPackageData, { rejectWithValue }) => {
        try {

            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;


            console.log("Subscription reducer token :", token)


            if (!token) {
                return rejectWithValue("No token found. Please login again.");
            }
            const res = await fetch("https://file-management-system-backend.vercel.app/subscription/package", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (!res.ok) {
                return rejectWithValue(result.message)
            };

            return result.result;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);





const Subscription_PackageSlice = createSlice({
    name: "Subscription_Package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SubscriptionPackage.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(SubscriptionPackage.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptionpackage = action.payload
            })
            .addCase(SubscriptionPackage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const Subscription_PackageSliceReducer = Subscription_PackageSlice.reducer
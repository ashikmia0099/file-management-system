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
    allPackages: SubscriptionPackageData[];
    loading: boolean;
    error: string | null
}


const initialState: SubscriptionPackageState = {
    allPackages: [],
    loading: false,
    error: null
}

// get api fetch

export const fetchAllSubscriptionPackages = createAsyncThunk<SubscriptionPackageData[], void, { rejectValue: string }>(
    "package/getSubscriptionPackage",
    async (_, { rejectWithValue }) => {
        try {

            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;
            // console.log("Subscription reducer token :", token)

            if (!token) {
                return rejectWithValue("Login required");
            }
            const res = await fetch("https://file-management-system-backend.vercel.app/subscription/package", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
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
)





const GetSubscription_PackageSlice = createSlice({
    name: "getSubscriptionPackage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSubscriptionPackages.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchAllSubscriptionPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.allPackages = action.payload
            })
            .addCase(fetchAllSubscriptionPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const getSubscriptionPackageSliceReducer = GetSubscription_PackageSlice.reducer
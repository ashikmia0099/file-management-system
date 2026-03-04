import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SelectedPackageData {
    packageId: string;

}

interface SelectedPackageState {
    PackageId: SelectedPackageData;
    loading: boolean;
    error: string | null
}


const initialState: SelectedPackageState = {
    PackageId: { packageId: "" },
    loading: false,
    error: null
}



// post api fetch 

export const SelectdPackage = createAsyncThunk<SelectedPackageData, SelectedPackageData, { rejectValue: string }>(
    "selectedPackage/userSelectedPackage",
    async (data: SelectedPackageData, { rejectWithValue }) => {
        try {

            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;

            console.log("selected package reducer token :", token)


            if (!token) {
                return rejectWithValue("No token found. Please login again.");
            }
            const res = await fetch("https://file-management-system-backend.vercel.app/selected/package", {
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





const selectedPackageSlice = createSlice({
    name: "selectedPackages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SelectdPackage.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(SelectdPackage.fulfilled, (state, action) => {
                state.loading = false;
                state.PackageId = action.payload
            })
            .addCase(SelectdPackage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const SelectedPackageReducer = selectedPackageSlice.reducer
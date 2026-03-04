import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FolderData {
    name: string;
    parentFolderId?: string | null;
    packageId?:string | null
}

interface folderState {
    name: FolderData | null;
    loading: boolean;
    error: string | null
}


const initialState: folderState = {
    name: null,
    loading: false,
    error: null
}



// post api fetch 

export const fetchFolder = createAsyncThunk<FolderData, FolderData, { rejectValue: string }>(
    "folder/createfolder",
    async (data: FolderData, { rejectWithValue }) => {
        try {
            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;

            if (!token) {
                return rejectWithValue("No token found. Please login again.");
            }

            const res = await fetch("https://file-management-system-backend.vercel.app/folder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    parentFolderId: data.parentFolderId || null,
                    packageId: data.packageId || null
                })
            });

            const result = await res.json();

            if (!res.ok) {
                return rejectWithValue(result.message || "Failed to create folder");
            };

            // ekhane result.data return korte hobe, na je result.result
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);

const FolderPackageSlice = createSlice({
    name: "Folder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFolder.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload
            })
            .addCase(fetchFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const FolderReducer = FolderPackageSlice.reducer
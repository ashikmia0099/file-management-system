import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FileType {
    id : string;
    originalFileName : string;
    filePath: string;
    
}

interface fileState {
    file: FileType | null;
    files: FileType[];
    loading: boolean;
    error: string | null
}


const initialState: fileState = {
    file: null,
    files : [],
    loading: false,
    error: null
}

// post api fetch 

export const fetchFile = createAsyncThunk<FileType,{ file: File; folderId: string }, { rejectValue: string }>(
    "file/createfile",
    async (data, { rejectWithValue }) => {
        try {
            const auth = localStorage.getItem("auth");
            const token = auth ? JSON.parse(auth).token : null;

            if (!token) {
                return rejectWithValue("No token found. Please login again.");
            }

            const formData : any = new FormData();
            formData.append("file",data.file)

            const res = await fetch(`https://file-management-system-backend.vercel.app/files/upload/${data.folderId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const result = await res.json();

            if (!res.ok) {
                return rejectWithValue(result.message || "Failed to upload file");
            };

            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFile.fulfilled, (state, action) => {
                state.loading = false;
                state.file = action.payload;
                state.files.push(action.payload)
            })
            .addCase(fetchFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const FileReducer = fileSlice.reducer
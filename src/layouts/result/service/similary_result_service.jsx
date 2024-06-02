import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';

export const querySimilaryResultService = createAsyncThunk(
        'similar-results',
        async ({ payload }, { rejectWithValue }) => {
                try {
                        const response = await api.post('/similar-results', payload);
                        console.log("Response from server:", response.data);
                        return response.data;
                } catch (error) {
                        if (error.response) {
                                console.error("Error response:", error.response.data);
                                return rejectWithValue(error.response.data);
                        } else if (error.request) {
                                console.error("Error request:", error.request);
                                return rejectWithValue({ error: "Can't connect with the server. Please check your network connection." });
                        } else {
                                console.error("Error message:", error.message);
                                return rejectWithValue({ error: "Error setting up the request." });
                        }
                }
        }
);

const querySimilaryResultServiceSlice = createSlice({
        name: 'querySimilaryResultService',
        initialState: {
                data: null,
                similarityData: null,
                loading: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(querySimilaryResultService.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(querySimilaryResultService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.similarityData = action.payload;
                        })
                        .addCase(querySimilaryResultService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload.error;
                        });
        },
});

export default querySimilaryResultServiceSlice.reducer;

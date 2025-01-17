import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';
import axios from 'axios';

export const querySuggestionsService = createAsyncThunk(
        'querySuggestionsService/query',
        async ({ dataset, query }, { rejectWithValue }) => {
                try {
                        console.log("Payload sent to the server:", { dataset, query });
                        const response = await api.post('/query-suggestions', { dataset, query });
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

const querySuggestionsServiceSlice = createSlice({
        name: 'querySuggestionsService',
        initialState: {
                data: null,
                loading: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(querySuggestionsService.pending, (state) => {
                                state.loading = true;
                        })
                        .addCase(querySuggestionsService.fulfilled, (state, action) => {
                                state.loading = false;
                                state.error = null;
                                state.data = action.payload;
                        })
                        .addCase(querySuggestionsService.rejected, (state, action) => {
                                state.loading = false;
                                state.error = action.payload.error;
                        });
        },
});

export default querySuggestionsServiceSlice.reducer;

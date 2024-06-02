import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../core/network/api';
import axios from 'axios';

export const queryService = createAsyncThunk(
        'queryService/query',
        async ({ dataset, model, query }, { rejectWithValue }) => {
                try {
                        console.log("Payload sent to the server:", { dataset, model, query });
                        const response = await api.post('/query', { dataset, model, query });
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

const queryServiceSlice = createSlice({
        name: 'queryService',
        initialState: {
                data: null,
                loadingQuery: false,
                error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
                builder
                        .addCase(queryService.pending, (state) => {
                                state.loadingQuery = true;
                        })
                        .addCase(queryService.fulfilled, (state, action) => {
                                state.loadingQuery = false;
                                state.error = null;
                                state.data = action.payload;
                        })
                        .addCase(queryService.rejected, (state, action) => {
                                state.loadingQuery = false;
                                state.error = action.payload.error;
                        });
        },
});

export default queryServiceSlice.reducer;

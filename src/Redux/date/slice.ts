import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateSliceState, Status } from './types';
import { fetchDates } from './asyncActions';

const initialState: DateSliceState = {
    dates: {
        '': 0,
    },
    status: Status.LOADING, // loading, success, error
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDates.pending, (state) => {
            state.status = Status.LOADING;
            state.dates = {
                '': 0,
            };
        });
        builder.addCase(fetchDates.fulfilled, (state, action) => {
            state.dates = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchDates.rejected, (state) => {
            state.status = Status.ERROR;
            state.dates = {
                '': 0,
            };
        });
    },
});

export default dateSlice.reducer;

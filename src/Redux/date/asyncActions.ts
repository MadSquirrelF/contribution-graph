import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDates = createAsyncThunk<any, void>('dates/fetchDatesStatus', async () => {
    const { data } = await axios.get<any>('https://dpg.gg/test/calendar.json');
    return data;
});

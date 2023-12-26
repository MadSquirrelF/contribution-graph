import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import date from './date/slice';

export const store = configureStore({
    reducer: {
        date,
    },
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

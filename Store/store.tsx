import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import todoReducer from './reducer';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

export type RootState = ReturnType<typeof todoReducer>
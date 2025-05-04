import { configureStore } from '@reduxjs/toolkit/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '@/auth/slice';
import { authApi } from './auth/service';
import { monitoredWebpagesApi } from './monitoredWebpages/service';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [monitoredWebpagesApi.reducerPath]: monitoredWebpagesApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(monitoredWebpagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

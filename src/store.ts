import { configureStore } from '@reduxjs/toolkit/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '@/auth/slice';
import { authApi } from './auth/service';
import { monitoredWebpagesApi } from './monitoredWebpages/service';
import { userApi } from './user/service';
import { scheduledChecksApi } from './scheduledChecks/service';
import { monitoringEventsApi } from './monitoringEvents/service';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [monitoredWebpagesApi.reducerPath]: monitoredWebpagesApi.reducer,
        [scheduledChecksApi.reducerPath]: scheduledChecksApi.reducer,
        [monitoringEventsApi.reducerPath]: monitoringEventsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(monitoredWebpagesApi.middleware)
            .concat(userApi.middleware)
            .concat(scheduledChecksApi.middleware)
            .concat(monitoringEventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

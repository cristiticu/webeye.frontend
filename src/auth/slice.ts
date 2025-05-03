import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { AuthSliceState, LoginActionPayload, TokenData } from './types';

const initialState: AuthSliceState = {
    accessToken: '',
    refreshToken: '',
    userGuid: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginActionPayload>) => {
            try {
                const decoded = jwtDecode<TokenData>(action.payload.accessToken);

                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.userGuid = decoded.user_guid;
            } catch (_) {
                console.error('Invalid JWT Token');
            }
        },

        logout: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.userGuid = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

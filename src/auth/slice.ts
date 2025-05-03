import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState, LoginActionPayload } from './types';
import { decodeAuthJwt, extractAuthStateFromCookie } from './utils';

const initialState: AuthSliceState = {
    accessToken: '',
    refreshToken: '',
    userGuid: '',
    ...extractAuthStateFromCookie(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginActionPayload>) => {
            try {
                const userData = decodeAuthJwt(action.payload.accessToken);

                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.userGuid = userData.userGuid;
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

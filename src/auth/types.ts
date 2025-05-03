export type AuthSliceState = {
    accessToken: string;
    refreshToken: string;
    userGuid: string;
};

export type LoginActionPayload = {
    accessToken: string;
    refreshToken: string;
};

export type TokenData = {
    user_guid: string;
};

export type LoginParams = {
    email: string;
    password: string;
};
export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};

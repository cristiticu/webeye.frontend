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

export type RegisterParams = {
    email: string;
    password: string;
    f_name: string;
    l_name?: string;
};

export type RegisterResponse = {
    guid: string;
    email: string;
    f_name: string;
    l_name: string;
    c_at: string;
};

export type ChangePasswordParams = {
    old_password: string;
    new_password: string;
};

export type ChangePasswordResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};

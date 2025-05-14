export type User = {
    guid: string;
    email: string;
    f_name: string;
    l_name: string;
    c_at: string;
};

export type UpdateUserParams = {
    email?: string;
    f_name?: string;
    l_name?: string;
};

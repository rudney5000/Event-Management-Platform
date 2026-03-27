export type AuthState = {
    isAuthenticated: boolean;
};

export type User = {
    id: string;
    email: string;
};

export type UserState = {
    profile?: User;
};

export type AuthState = {
    isAuthenticated: boolean;
    user?: {
        id: string;
        email: string;
    };
    accessToken?: string;
    refreshToken?: string;
};

export type User = {
    id: string;
    email: string;
};
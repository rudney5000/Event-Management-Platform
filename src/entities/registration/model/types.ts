export interface RegistrationRequest {
    eventId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userId: string;
}

export interface RegistrationResponse {
    id: string;
    eventId: string;
    userId: string;
    userName: string;
    userEmail: string;
    status: string;
    paymentStatus: string;
    paymentRequired: boolean;
    paymentLink?: string;
    createdAt: string;
}
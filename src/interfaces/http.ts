
export interface HttpErrorResponse {
    detail: string;
}

export interface AuthTokenResponse {
    token: string;
    user_id: number;
    email: string;
}

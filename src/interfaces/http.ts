
export interface HttpErrorResponse {
    detail: string;
}

export interface AuthTokenResponse {
    token: string;
    id: number;
    name: string;
    email: string;
}

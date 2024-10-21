export interface ValidateTokenResponse {
	expired: boolean;
	unauthorized: boolean;
	newToken: string;
}
export interface ValidateTokenQuery {
	token: string;
	refreshToken: string;
	ip: string;
	clientID: string;
	pageRoot: string;
	httpVerb: string;
}
export interface RefreshTokenResponse {
	validRefreshToken: boolean;
	token: string;
}
export interface RefreshTokenQuery {
	refreshToken: string;
	clientID: string;
}

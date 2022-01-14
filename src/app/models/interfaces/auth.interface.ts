export interface IAuth {
  username: string;
  token: string;
  tokenValid: boolean;
  tokenExpirationTimer: number;
}

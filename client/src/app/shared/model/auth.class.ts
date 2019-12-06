export class Auth {

  constructor(
    public username: string = '',
    public token: string = '',
    public tokenValid: boolean = false,
    public tokenExpirationTimer: number = 0
  ) { }

}

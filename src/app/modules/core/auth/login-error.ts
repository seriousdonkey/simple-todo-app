export enum LoginErrorType {
  INVALID_EMAIL,
  USER_DISABLED,
  USER_NOT_FOUND,
  WRONG_PASSWORD
}

export class LoginError extends Error {
  constructor(msg: string, public type: LoginErrorType) {
    super(msg);
  }
}

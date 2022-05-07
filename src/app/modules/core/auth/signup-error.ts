export enum SignupErrorType {
  EMAIL_ALREADY_IN_USE,
  INVALID_EMAIL,
  OPERATION_NOT_ALLOWED,
  WEAK_PASSWORD
}

export class SignupError extends Error {
  constructor(msg: string, public type: SignupErrorType) {
    super(msg);
  }
}

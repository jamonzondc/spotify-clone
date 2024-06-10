export class ErrorResponse {
  constructor(private code: string, private error: string) {}

  public getCode(): string {
    return this.code;
  }

  public getError(): string {
    return this.error;
  }
}

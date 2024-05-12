export class ErrorResponse {
  constructor(private code: number, private error: string) {}

  public getCode(): number {
    return this.code;
  }

  public getError(): string {
    return this.error;
  }
}

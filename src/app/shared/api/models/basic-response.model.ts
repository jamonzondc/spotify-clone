import { ErrorResponse } from './error.response.model';

export class BasicResponse<T> {
  constructor(
    private data: T | null,
    private error: ErrorResponse | null = null
  ) {}

  public getData(): T | null {
    return this.data;
  }

  public getError(): ErrorResponse | null {
    return this.error;
  }

  public hasError(): boolean {
    return this.data === null || this.error !== null;
  }
}

import { ErrorResponse } from './error.response.model';

export class BasicResponse<T> {
  constructor(
    private data: T | undefined,
    private error: ErrorResponse | undefined = undefined
  ) {}

  public getData(): T | undefined {
    return this.data;
  }

  public getError(): ErrorResponse | undefined {
    return this.error;
  }

  public hasError(): boolean {
    return this.data === undefined;
  }
}

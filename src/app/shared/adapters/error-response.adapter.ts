import { ErrorResponse } from 'src/app/shared/api/models/error.response.model';

export const getErrorResponseAdapter = (response: any): ErrorResponse => {
  return new ErrorResponse(
    response?.error?.error?.status,
    response?.error?.error?.message
  );
};

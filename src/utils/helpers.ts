interface APIError {
  data?: {error: string};
  status?: number;
  message: string;
}

export const errorMessage = (err: unknown) => {
  const error = err as APIError;
  return error?.data?.error || error.message;
};

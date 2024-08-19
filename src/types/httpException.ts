export interface HttpException extends Error {
  status?: number;
}

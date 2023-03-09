export interface ErrorDto {
  httpCode:   number;
  errorCode: string;
  message:    string;
  errors:     string[];
}

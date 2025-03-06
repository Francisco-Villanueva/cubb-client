export interface IUploadImageAPIResponse {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    extendedRequestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  ETag: string;
  ServerSideEncryption: string;
  url: string;
}

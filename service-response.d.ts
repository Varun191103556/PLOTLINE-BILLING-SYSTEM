interface ServiceAPIResponse<T> {
  body: ResponseBody<T>;
  statusCode: number;
  headers?: Object;
}

interface ResponseBody<TD> {
  success: boolean;
  message: string | string[];
  data?: TD;
}

export { ServiceAPIResponse, ResponseBody };

class HttpException extends Error {
  statusCode: number;
  body: {
    success: boolean;
    message: string | string[];
  };

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.body.success = false;
    this.body.message = message;
  }
}

export { HttpException as default };

class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public publicMessage?: string,
    public code?: string,
  ) {
    super(message);

    if (!publicMessage) {
      this.publicMessage = message;
    }
  }
}

export default CustomError;

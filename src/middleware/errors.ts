import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle errors in the application.
 *
 * @param error - The error object or any other type of error.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * This middleware checks if an error is present. If the error is not a Boom error,
 * it logs the error to the console. If the error is a Boom error, it sends the
 * appropriate HTTP status code and JSON payload to the client. If the error is not
 * a Boom error, it sends a 500 Internal Server Error response with a generic message.
 * If no error is present, it passes control to the next middleware function.
 */
export default (
  error: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (!error.isBoom) {
      console.error(error);
    }

    const { isBoom, output } = error;
    if (isBoom) {
      res.status(output.statusCode);
      res.json(output.payload);
      res.end();
      return;
    }

    const statusCode = 500;
    res.status(statusCode).json({
      statusCode,
      error: "Internal Server Error",
      message: "An internal server error occurred",
    });
    res.end();
    return;
  }

  next();
};

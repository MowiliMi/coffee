import { Request, Response, NextFunction } from "express";

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

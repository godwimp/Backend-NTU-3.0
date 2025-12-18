import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  name: string;
  errors?: any[];
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let status = err.status || 500;
  let message: string | string[] = err.message || "Internal Server Error";

  switch (err.name) {
    case "Invalid Input":
      status = 400;
      message = "Email/ passwword cannot be empty";
      break;
    case "Invalid User":
      status = 401;
      message = "Error email user not found / password not matched";
      break;
    case "NotFound":
      status = 404;
      message = "Error not found";
      break;
    case "Unauthorized":
      status = 401;
      message = "Error Authentication";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Error Authentication";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden error authorization";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors?.map((error) => error.message) || "Validation Error";
      break;
    case "ValidationErrorItem":
      status = 400;
      message = err.errors?.map((error) => error.message) || "Validation Error";
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message =
        err.errors?.map((error) => error.message) || "Unique Constraint Error";
      break;
    case "FileRequired":
      status = 400;
      message = "File is required";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  console.log(err.name);
  res.status(status).json({ message });
};

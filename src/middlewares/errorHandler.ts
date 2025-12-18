import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
  status?: number;
  name: string;
  errors?: any[];
}

interface ErrorResponse {
    status: number;
    message: string | string[];
}

const ERROR_MAP: Record<string, ErrorResponse> = {
    "Invalid Input": {
        status: 400,
        message: "Email/Password cannot be empty",
    },
    "Invalid User": {
        status: 401,
        message: "Error email or password is incorrect",
    },
    NotFound: {
        status: 404,
        message: "Error not found",
    },
    Unauthorized: {
        status: 401,
        message: "Error unauthorized access",
    },
    JsonWebTokenError: {
        status: 401,
        message: "Error Authentication",
    },
    Forbidden: {
        status: 403,
        message: "Forbidden Error Authorization",
    },
    FileRequired: {
        status: 400,
        message: "File is required",
    },
};

const getValidationErrorResponse = (err: CustomError): ErrorResponse => ({
    status: 400,
    message: err.errors?.map((error) => error.message) || "Validation Error",
});

const getUniqueConstraintErrorResponse = (err: CustomError): ErrorResponse => ({
    status: 400,
    message: err.errors?.map((error) => error.message) || "Unique Constraint Error",
});

export const errorHandler = (
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.log(err.name);

    let status = 500;
    let message: string | string[] = "Internal Server Error";

    if (ERROR_MAP[err.name]) {
        ({ status, message } = ERROR_MAP[err.name]);
    } else if (err.name === "SequelizeValidationError" || err.name === "ValidationErrorItem"){
        ({ status, message } = getValidationErrorResponse(err));
    } else if (err.name === "SequelizeUniqueConstraintError") { 
        ({ status, message } = getUniqueConstraintErrorResponse(err));
    } else if (err.status) {
        status = err.status;
        message = err.message;
    }

    res.status(status).json({ message });
};

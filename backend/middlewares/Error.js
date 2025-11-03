import ApiError from "../utils/ApiError.js";

export const notFound = (_req, _res, next)=>{
  return next(new ApiError("Not found", 404));
}

export const globalErrorHandler = (err, _req, res, next)=>{
  const errorResponse = {
    success: false,
    message: err.message,
    details: err.details
  }

  return res.status(err.status || 500).json(errorResponse);
}
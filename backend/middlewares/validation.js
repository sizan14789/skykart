import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error?.issues[0]?.message;
      next(new ApiError(errorMessage, 400, "Validation error"))
    }

    req.body = result.data;
    next();
  };
};

export default validate;

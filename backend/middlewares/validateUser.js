import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

export const validateBuyer = async (req, res, next) => {
  const sessionid = req.cookies?.sessionid;

  if (!sessionid)
    return next(new ApiError("Unauthorized", 401, "Failed to verify as buyer...no session id"));

  const buyerid = (
    await pool.query(
      `select id from "user" join "session" on "user".id=userid where sessionid=$1 and "session".created_at + interval '7day' > now() and 'buyer' = any ("role")`, [sessionid]
    )
  ).rows[0];

  if (!buyerid)
    return next(new ApiError("Unauthorized", 401, "Failed to verify as a buyer"));

  req.buyerid = buyerid.id;
  next();
};

export const validateSeller = async (req, res, next) => {
  const sessionid = req.cookies?.sessionid;

  if (!sessionid)
    return next(new ApiError("Unauthorized", 401, "Failed to verify as seller"));

  const sellerid = (
    await pool.query(
      `select id from "user" join "session" on "user".id=userid where sessionid=${sessionid} and "session".created_at + interval '1day' > now() and 'seller' = any ("role")`
    )
  ).rows[0];

  if (!sellerid)
    return next(new ApiError("Unauthorized", 401, "Failed to verify as seller"));

  req.sellerid = sellerid;
  next();
};

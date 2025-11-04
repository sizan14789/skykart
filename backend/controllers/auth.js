import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";
import bcrypt from "bcrypt";

// signup
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = (
    await pool.query('select id from "user" where username=$1 or email=$2', [
      username,
      email,
    ])
  ).rows;

  if (userExists.length !== 0)
    return next(
      new ApiError(
        "User exists at given username or email",
        409,
        "at /api/auth/signup"
      )
    );

  const hashedPass = await bcrypt.hash(password, 12);
  const createdUser = (
    await pool.query(
      'insert into "user" (username, email, password) values ($1, $2, $3) returning username, email, role',
      [username, email, hashedPass]
    )
  ).rows[0];

  const sessionid = crypto.randomUUID(32);

  await pool.query(
    'insert into "session" (sessionid, userid) values ($1, $2) ',
    [sessionid, createdUser[0]?.id]
  );

  // cookie
  res.cookie("sessionid", sessionid, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 3600 * 24 * 7,
  });

  return res.status(201).json(createdUser);
};

// login
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  const userExists = (
    await pool.query(
      'select id, username, password, email, role from "user" where username=$1 or email=$1',
      [username]
    )
  ).rows;

  if (userExists.length === 0)
    return next(new ApiError("User does not exist", 404, "at /api/auth/login"));

  const result = await bcrypt.compare(password, userExists[0].password);

  if (!result)
    return next(new ApiError("Wrong Password", 401, "at /api/auth/login"));

  // session management
  const sessionid = crypto.randomUUID(32);

  await pool.query(
    'insert into "session" (sessionid, userid) values ($1, $2) ',
    [sessionid, userExists[0]?.id]
  );

  // cookie
  res.cookie("sessionid", sessionid, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 3600 * 24 * 7,
  });

  const responseUser = {
    username: userExists[0].username,
    email: userExists[0].email,
    role: userExists[0].role,
  };

  return res.status(200).json(responseUser);
};

// session
export const session = async (req, res, next) => {
  const sessionid = req.cookies?.sessionid;
  if (typeof(sessionid) !== "string") return next(new ApiError("Invalid session", 400));

  if (!sessionid) return next(new ApiError("No session", 404));

  const sessionUserFetched = await pool.query(
    `select username, email, role from session as s join "user" as u on s.userid=u.id where sessionid=$1 and s.created_at > now() - interval '1 day'`,
    [sessionid]
  );

  if (sessionUserFetched.rows.length === 0)
    return next(new ApiError("Unauthorized", 401));

  const user = sessionUserFetched.rows[0];

  return res.status(200).json(user);
};

// logout
export const logout = async (req, res, next) => {
  const sessionid = req.cookies?.sessionid;
  
  if (typeof(sessionid) !== "string") return next(new ApiError("Invalid session", 400));
  
  if (!sessionid) return next(new ApiError("No session", 404));

  const sessionUserFetched = await pool.query(
    `delete from session where sessionid=$1'`,
    [sessionid]
  );

  if (sessionUserFetched.rows.length === 0)
    return next(new ApiError("Unauthorized", 401));

  res.cookie("sessionid", sessionid, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 3600 * 24 * 7,
  });

  return res.status(200).json({success: true, message: "Session deleted"});
};

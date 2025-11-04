import pool from "../utils/connectPool.js";

export const getAllProducts = async (req, res, next) => {
  const queries = req.query;
  const search = queries?.search;

  if (search) {
    const data = (
      await pool.query(`select * from product where name ilike $1`, [
        `%${search}%`,
      ])
    ).rows;
    res.status(200).json(data);
  } else {
    const data = (await pool.query(`select * from product`)).rows;
    res.status(200).json(data);
  }
};

export const getProductsBySeller = async (req, res, next) => {
  const sellerid = req.sellerid;
  const data = (
    await pool.query(`select * from product where sellerid=${sellerid}`)
  ).rows;
  res.status(200).json(data);
};

import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

// single product
export const getProduct = async (req, res, next) => {
  const id = req.params?.id;
  if (!id)
    return next(new ApiError("No product id", 404, "Error at /api/product/id"));

  const data = (
    await pool.query(
      `select p.id, p.name as product_name, p.image as product_image, description, rating, p.price, p.offer_price, p.category, p.brand from product as p where p.id=$1`,
      [id]
    )
  ).rows[0];
  return res.status(200).json(data);
};

// all products
export const getAllProducts = async (req, res) => {
  const queries = req.query;
  const search = queries.search ? queries.search : "" ;
  const limit = queries.limit ? Number(queries.limit) : 1000;

  console.log(search, limit)

  const data = (
    await pool.query(
      `select id, name as product_name, image as product_image, rating, offer_price from product where name ilike $1 order by created_at desc Limit $2`,
      [`%${search}%`, limit]
    )
  ).rows;

  return res.status(200).json(data);
};


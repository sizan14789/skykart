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
  let {
    search = "",
    limit = 1000,
    category = "",
    min_price = 0,
    max_price = 10000000,
    order_by = "created_at",
    order = "DESC",
  } = req.query;

  // validating queries
  const valid_order_bys = ["created_at", "offer_price"];
  if (!valid_order_bys.includes(order_by)) order_by = "created_at";

  order =
    String(order || "")
      .trim()
      .toLowerCase() === "asc"
      ? "ASC"
      : "DESC";

  if (category) category = category.split(";");

  min_price = Number(min_price) || 0;
  max_price = Number(max_price) || 10000000;
  limit = Number(limit);

  const categoriesExist = category && category.length > 0;

  let sql = `SELECT id, name AS product_name, image AS product_image, rating, offer_price 
  FROM product WHERE 
  name ILIKE $1 AND 
  offer_price BETWEEN $2 AND $3
  ${categoriesExist ? "AND category=any($4)" : ""} 
  ORDER BY ${order_by} ${order} `;

  const params = [`%${search}%`, min_price, max_price];
  if (categoriesExist) params.push(category);
  params.push(limit);

  sql += ` limit ${categoriesExist ? "$5" : "$4"}`;

  const data = (await pool.query(sql, params)).rows;

  return res.status(200).json(data);
};

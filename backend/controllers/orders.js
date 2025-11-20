import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

// get orders
export const getOrders = async (req, res) => {
  const { buyerid } = req;

  const orders = (
    await pool.query(
      `select o.id, p.id as product_id, o.created_at, p.image as product_image, p.name as product_name, quantity, p.offer_price, quantity*offer_price as subtotal, order_status from "order" as o join product as p on o.product_id = p.id where buyer_id=$1 AND order_status!='Archived'`,
      [buyerid]
    )
  )?.rows;

  res.status(200).send(orders);
};

// get order by id
export const getOrderById = async (req, res) => {
  const { buyerid } = req;
  const id = req.params.id;
 
  const order = (
    await pool.query(
      `select o.id, p.id as product_id, o.full_name, o.phone, o.address, o.message, o.created_at, p.image as product_image, p.name as product_name, p.description, quantity, p.offer_price, quantity*offer_price as subtotal, order_status from "order" as o join product as p on o.product_id = p.id where o.id=$1 and buyer_id=$2`,
      [id, buyerid]
    )
  )?.rows[0];

  res.status(200).send(order);
};

// update order incomplete
export const addOrders = async (req, res, next) => {
  const { buyerid } = req;

  const body = req.body;
  const {
    full_name,
    phone, 
    city,
    upzilla,
    street,
    village,
    message,
  } = body;

  const address = village + ", " + street + ", " + upzilla + ", " + city;

  const buyerInfo = {
    buyer_id: buyerid,
    full_name: full_name,
    phone: phone, 
    address: address,
    message: message,
  };

  const buyerCart = (
    await pool.query(`select items from cart where userid=$1`, [buyerid])
  ).rows[0].items;

  const keysArray = Object.keys(buyerCart);

  if (keysArray.length === 0)
    return next(
      new ApiError("No items in the cart", 400, "Possibly forged request")
    );

  for (const key of keysArray) {
    try {
      await pool.query(
        'insert into "order" (product_id, quantity, buyer_id, full_name,  address, phone, message) values ($1, $2, $3, $4, $5, $6, $7)',
        [
          Number(key),
          Number(buyerCart[key]),
          Number(buyerInfo.buyer_id),
          buyerInfo.full_name, 
          buyerInfo.address,
          buyerInfo.phone,
          buyerInfo.message ? buyerInfo.message : "",
        ]
      );
    } catch (error) {
      console.error(error);
    }
  }

  await pool.query(`update cart set items='{}'::jsonb where userid=$1`, [
    buyerid,
  ]);

  return res.status(201).json({ success: true, message: "Order Placed" });
};

// cancel order
export const cancelOrder = async (req, res, next) => {
  const { buyerid } = req;
  const id = req.params.id;

  const order_status = (await pool.query(`SELECT order_status FROM "order" WHERE buyer_id=$1 AND id=$2`, [buyerid, id]))?.rows[0]?.order_status;

  if(order_status!=="Pending")
    return next(new ApiError("Unauthorized", 401, "Order is not pending anymore"));

  await pool.query(
    `UPDATE "order" SET order_status='Cancelled' WHERE buyer_id=$1 AND id=$2`,
    [buyerid, id]
  );

  return res.status(201).json({ success: true, message: "Order Canceled" });
};

// archive order
export const archiveOrder = async (req, res, next) => {
  const { buyerid } = req;
  const id = req.params.id;

  const order_status = (await pool.query(`SELECT order_status FROM "order" WHERE buyer_id=$1 AND id=$2`, [buyerid,  id]))?.rows[0]?.order_status;

  if(order_status!=="Cancelled" && order_status!=="Completed")
    return next(new ApiError("Unauthorized", 401, "Order is not cancelled or completed"));

  await pool.query(
    `UPDATE "order" SET order_status='Archived' WHERE buyer_id=$1 AND id=$2`,
    [buyerid, id]
  );

  return res.status(201).json({ success: true, message: "Order Archived" });
};

// get archived
export const getArchived = async (req, res) => {
  const { buyerid } = req;

  const orders = (
    await pool.query(
      `select o.id, p.id as product_id, o.created_at, p.image as product_image, p.name as product_name, quantity, p.offer_price, quantity*offer_price as subtotal, order_status from "order" as o join product as p on o.product_id = p.id where buyer_id=$1 AND order_status='Archived' or order_status='Completed'`,
      [buyerid]
    )
  )?.rows;

  res.status(200).send(orders);
};
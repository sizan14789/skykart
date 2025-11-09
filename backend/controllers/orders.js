import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

// get orders
export const getOrders = async (req, res) => {
  const { buyerid } = req;

  const orders = (
    await pool.query(
      `select o.id, p.id as product_id, o.created_at, p.image as product_image, p.name as product_name, quantity, p.offer_price, quantity*offer_price as subtotal, order_status from "order" as o join product as p on o.product_id = p.id where buyer_id=$1;`,
      [buyerid]
    )
  )?.rows;

  res.status(200).send(orders);
};

// get order by id
export const getOrderById = async (req, res) => {
  const { buyerid } = req;
  const id = req.params.id;

  // todo complete
  const order = (
    await pool.query(
      `select o.id, p.id as product_id, o.full_name, o.phone, o.address, o.message, o.created_at, p.image as product_image, p.name as product_name, p.description, quantity, p.offer_price, quantity*offer_price as subtotal, order_status from "order" as o join product as p on o.product_id = p.id where o.id=$1 and buyer_id=$2`,
      [id, buyerid]
    )
  )?.rows[0];
  
  res.status(200).send(order);
};

// update order incomplete
export const updateOrder = async (req, res, next) => {
  const { buyerid } = req;

  const body = req.body;
  const {
    full_name,
    phone,
    division,
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
    division: division,
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
        'insert into "order" (product_id, quantity, buyer_id, full_name, division, address, phone, message) values ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
          Number(key),
          Number(buyerCart[key]),
          Number(buyerInfo.buyer_id),
          buyerInfo.full_name,
          buyerInfo.division,
          buyerInfo.address,
          buyerInfo.phone,
          buyerInfo.message ? buyerInfo.message : "",
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }

  await pool.query(`update cart set items='{}'::jsonb where userid=$1`, [
    buyerid,
  ]);

  return res.status(201).json({ success: true, message: "Order Placed" });
};

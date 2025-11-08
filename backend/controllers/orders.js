import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

// get orders only
export const getCartOnly = async (req, res) => {
  const { buyerid } = req;

  const cartProducts = (
    await pool.query(`SELECT items from cart where userid = $1;`, [buyerid])
  )?.rows[0]?.items;

  const keysArray = Object.keys(cartProducts);
  let formattedCart = {};
  keysArray.forEach((each) => {
    formattedCart[each] = Number(cartProducts[each]);
  });

  res.status(200).send(formattedCart);
};

// get orders with product details
export const getCartWithProductDetails = async (req, res) => {
  const { buyerid } = req;

  const cartProducts = (
    await pool.query(
      `SELECT p.id, p.name AS product_name, p.image AS product_image, p.offer_price, ci.quantity::int AS quantity, "user".username as seller_name
    FROM cart c JOIN jsonb_each_text(c.items) AS ci(product_id, quantity) ON true 
    JOIN product p ON p.id::text = ci.product_id join "user" on p.sellerid="user".id
    WHERE c.userid = $1;`,
      [buyerid]
    )
  ).rows;

  res.status(200).send(cartProducts);
};

// update order
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
      const sellerid = (
        await pool.query(`select sellerid from product where id=$1`, [key])
      ).rows[0]?.sellerid;

      await pool.query(
        'insert into "order" (product_id, quantity, buyer_id, full_name, division, address, phone, message, seller_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          Number(key),
          Number(buyerCart[key]),
          Number(buyerInfo.buyer_id),
          buyerInfo.full_name,
          buyerInfo.division,
          buyerInfo.address,
          buyerInfo.phone,
          buyerInfo.message ? buyerInfo.message : "",
          Number(sellerid),
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

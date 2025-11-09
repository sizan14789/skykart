import pool from "../utils/connectPool.js";

// get cart only
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

// get cart with product details
export const getCartWithProductDetails = async (req, res) => {
  const { buyerid } = req;

  const cartProducts = (
    await pool.query(
      `SELECT p.id, p.name AS product_name, p.image AS product_image, p.offer_price, ci.quantity::int AS quantity
    FROM cart c JOIN jsonb_each_text(c.items) AS ci(product_id, quantity) ON true 
    JOIN product p ON p.id::text = ci.product_id
    WHERE c.userid = $1;`,
      [buyerid]
    )
  ).rows;

  res.status(200).send(cartProducts);
};

// update cart
export const updateCart = async (req, res) => {
  const { buyerid } = req;
  const newCart = req.body;

  const cartExists = await pool.query(
    `select userid from cart where userid=$1`,
    [buyerid]
  );

  if (cartExists.rows.length === 0) {
    const createdCart = (
      await pool.query(
        `insert into cart (items, userid) values ($1::jsonb, $2) returning items`,
        [newCart, buyerid]
      )
    ).rows[0];

    return res.status(201).json(createdCart);
  }

  const updatedCart = (
    await pool.query(
      `update cart set items=$1 where userid=$2 returning items`,
      [newCart, buyerid]
    )
  ).rows[0];

  return res.status(201).json(updatedCart);
};

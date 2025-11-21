import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import pool from "../utils/connectPool.js";
import ApiError from "../utils/ApiError.js";

const router = Router();

// get wishlist for users
router.get("/api/wishlist", validateBuyer, async (req, res, next) => {
  const wishlistExists = (
    await pool.query(`select list from wishlist where userid=$1`, [req.buyerid])
  )?.rows;

  const list = wishlistExists[0].list.map((each) => Number(each));

  console.log(list);

  const wishlist = (
    await pool.query(
      `SELECT id, name AS product_name, image AS product_image, rating, offer_price, price, stock AS product_stock, ROUND(((price-offer_price)*100/price)::numeric, 0) AS offer_percentage FROM product WHERE id=ANY($1)`,
      [list]
    )
  )?.rows;

  if (wishlistExists.length == 0) {
    await pool.query(`INSERT INTO wishlist (userid, list) values($1, $2)`, [
      req.buyerid,
      [],
    ]);
    return res.status(200).json([]);
  }

  return res.status(200).json(wishlist);
});

// add to wishlist for users
router.post("/api/wishlist/:id", validateBuyer, async (req, res, next) => {
  const { id } = req.params;
  const wishlistExists = (
    await pool.query(`select list from wishlist where userid=$1`, [req.buyerid])
  )?.rows;

  if (wishlistExists.length == 0) {
    await pool.query(`INSERT INTO wishlist (userid, list) values($1, $2)`, [
      req.buyerid,
      [id],
    ]);
  } else {
    const existingList = wishlistExists[0].list.map((each) => Number(each));
    if (existingList.includes(Number(id))) {
      return next(new ApiError("Already in wishlist", 409));
    } else {
      existingList.push(id);
      await pool.query(`UPDATE wishlist SET list=$1 WHERE userid=$2`, [
        existingList,
        req.buyerid,
      ]);
    }
  }

  return res.sendStatus(201);
});

// add to wishlist for users
router.delete("/api/wishlist/:id", validateBuyer, async (req, res, next) => {
  const { id } = req.params;
  const wishlistExists = (
    await pool.query(`select list from wishlist where userid=$1`, [req.buyerid])
  )?.rows;

  if (wishlistExists.length == 0) {
    await pool.query(`INSERT INTO wishlist (userid, list) values($1, $2)`, [
      req.buyerid,
      [],
    ]);
    return next(
      new ApiError("Not in wishlist", 404, "Item is not in the users wishlist")
    );
  } else {
    const existingList = wishlistExists[0].list.map((each) => Number(each));
    if (!existingList.includes(Number(id))) {
      return next(
        new ApiError(
          "Not in wishlist",
          404,
          "Item is not in the users wishlist"
        )
      );
    } else {
      // todo pop
      const newList = existingList.filter(
        (each) => each.toString() !== id.toString()
      );
      await pool.query(`UPDATE wishlist SET list=$1 WHERE userid=$2`, [
        newList,
        req.buyerid,
      ]);
    }
  }

  return res.sendStatus(201);
});

// todo remove from wishlist

export default router;

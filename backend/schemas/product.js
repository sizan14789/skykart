import zod from "zod";

export const productSchema = zod.object({
  name: zod.string().trim(),
  description: zod.string().trim(),
  rating: zod.number(),
  price: zod.number(),
  offer_price: zod.number(),
  stock: zod.number(),
  brand: zod.string().trim(),
  category: zod.string().trim(),
});

export const convertProductTypes = (req, _res, next) => {
  const { body } = req;
  body.rating = Number(body.rating);
  body.price = Number(body.price);
  body.offer_price = Number(body.offer_price);
  body.stock = Number(body.stock);

  if (!body.brand) body.brand = "Unbranded";
  next();
};

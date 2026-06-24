import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category || null;

    const cursorUpdatedAt = req.query.cursorUpdatedAt;
    const cursorId = req.query.cursorId;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (cursorUpdatedAt && cursorId) {
      query.$or = [
        {
          updatedAt: {
            $lt: new Date(cursorUpdatedAt)
          }
        },
        {
          updatedAt: new Date(cursorUpdatedAt),
          _id: {
            $lt: cursorId
          }
        }
      ];
    }

    const products = await Product.find(query)
      .sort({
        updatedAt: -1,
        _id: -1
      })
      .limit(limit + 1);

    let nextCursor = null;

    if (products.length > limit) {
      const nextItem = products[limit - 1];

      nextCursor = {
        cursorUpdatedAt: nextItem.updatedAt,
        cursorId: nextItem._id
      };

      products.pop();
    }

    res.json({
      products,
      nextCursor
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

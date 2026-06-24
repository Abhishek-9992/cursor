import axios from "axios";

// const API = "http://localhost:5000/api/products";
const API =
  "https://your-backend.onrender.com/api/products";

export const fetchProducts = async ({
  cursorUpdatedAt,
  cursorId,
  category
}) => {
  const params = {};

  if (cursorUpdatedAt) {
    params.cursorUpdatedAt = cursorUpdatedAt;
  }

  if (cursorId) {
    params.cursorId = cursorId;
  }

  if (category) {
    params.category = category;
  }

  const response = await axios.get(API, {
    params
  });

  return response.data;
};

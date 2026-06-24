const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Furniture",
  "Beauty"
];

export const generateProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const createdDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000000000)
    );

    const updatedDate = new Date(
      createdDate.getTime() +
        Math.floor(Math.random() * 100000000)
    );

    products.push({
      name: `Product ${i + 1}`,
      category: randomCategory,
      price: Number((Math.random() * 1000).toFixed(2)),
      createdAt: createdDate,
      updatedAt: updatedDate
    });
  }

  return products;
};

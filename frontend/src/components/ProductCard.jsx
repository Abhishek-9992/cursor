// const ProductCard = ({ product }) => {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "10px",
//         marginBottom: "10px"
//       }}
//     >
//       <h3>{product.name}</h3>

//       <p>Category: {product.category}</p>

//       <p>${product.price}</p>

//       <small>
//         Updated: {new Date(product.updatedAt).toLocaleString()}
//       </small>
//     </div>
//   );
// };

// export default ProductCard;
const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "18px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
        border: "1px solid #f0f0f0"
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#222",
          fontSize: "20px"
        }}
      >
        {product.name}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px"
        }}
      >
        <span
          style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          {product.category}
        </span>

        <span
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#111827"
          }}
        >
          ${product.price}
        </span>
      </div>

      <p
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginTop: "10px"
        }}
      >
        Updated:
        {" "}
        {new Date(
          product.updatedAt
        ).toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;

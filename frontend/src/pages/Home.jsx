// import { useEffect, useState } from "react";
// import { fetchProducts } from "../api/productApi";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [cursor, setCursor] = useState(null);
//   const [category, setCategory] = useState("");

//   const loadProducts = async (reset = false) => {
//     const data = await fetchProducts({
//       cursorUpdatedAt: reset ? null : cursor?.cursorUpdatedAt,
//       cursorId: reset ? null : cursor?.cursorId,
//       category
//     });

//     if (reset) {
//       setProducts(data.products);
//     } else {
//       setProducts((prev) => [...prev, ...data.products]);
//     }

//     setCursor(data.nextCursor);
//   };

//   useEffect(() => {
//     loadProducts(true);
//   }, [category]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Products</h1>

//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       >
//         <option value="">All</option>
//         <option value="Electronics">Electronics</option>
//         <option value="Books">Books</option>
//         <option value="Fashion">Fashion</option>
//         <option value="Sports">Sports</option>
//       </select>

//       <div style={{ marginTop: "20px" }}>
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//           />
//         ))}
//       </div>

//       {cursor && (
//         <button onClick={() => loadProducts()}>
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useEffect, useState } from "react";
// import { fetchProducts } from "../api/productApi";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   const [cursor, setCursor] = useState(null);

//   // Stores cursors for previous pages
//   const [cursorHistory, setCursorHistory] = useState([]);

//   const [page, setPage] = useState(1);

//   const [category, setCategory] = useState("");

//   const loadFirstPage = async () => {
//     const data = await fetchProducts({
//       category
//     });

//     setProducts(data.products);

//     setCursor(data.nextCursor);

//     setPage(1);

//     setCursorHistory([]);
//   };

//   useEffect(() => {
//     loadFirstPage();
//   }, [category]);

//   // NEXT PAGE
//   const handleNext = async () => {
//     if (!cursor) return;

//     // Save current cursor in history
//     setCursorHistory((prev) => [...prev, cursor]);

//     const data = await fetchProducts({
//       cursorUpdatedAt: cursor.cursorUpdatedAt,
//       cursorId: cursor.cursorId,
//       category
//     });

//     setProducts(data.products);

//     setCursor(data.nextCursor);

//     setPage((prev) => prev + 1);
//   };

//   // PREVIOUS PAGE
//   const handlePrevious = async () => {
//     if (page === 1) return;

//     let previousCursor = null;

//     // If going back to page 1
//     if (page > 2) {
//       previousCursor = cursorHistory[page - 3];
//     }

//     const data = await fetchProducts({
//       cursorUpdatedAt:
//         previousCursor?.cursorUpdatedAt,
//       cursorId:
//         previousCursor?.cursorId,
//       category
//     });

//     setProducts(data.products);

//     setCursor(data.nextCursor);

//     setPage((prev) => prev - 1);

//     setCursorHistory((prev) =>
//       prev.slice(0, prev.length - 1)
//     );
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "900px",
//         margin: "0 auto"
//       }}
//     >
//       <h1>Products</h1>

//       {/* CATEGORY FILTER */}
//       <div style={{ marginBottom: "20px" }}>
//         <select
//           value={category}
//           onChange={(e) =>
//             setCategory(e.target.value)
//           }
//           style={{
//             padding: "10px",
//             width: "200px"
//           }}
//         >
//           <option value="">All Categories</option>

//           <option value="Electronics">
//             Electronics
//           </option>

//           <option value="Books">Books</option>

//           <option value="Fashion">
//             Fashion
//           </option>

//           <option value="Sports">Sports</option>

//           <option value="Furniture">
//             Furniture
//           </option>

//           <option value="Beauty">Beauty</option>
//         </select>
//       </div>

//       {/* PAGE NUMBER */}
//       <h2>Page {page}</h2>

//       {/* PRODUCTS */}
//       <div style={{ marginTop: "20px" }}>
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//           />
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           marginTop: "30px"
//         }}
//       >
//         <button
//           onClick={handlePrevious}
//           disabled={page === 1}
//           style={{
//             padding: "10px 20px",
//             cursor:
//               page === 1
//                 ? "not-allowed"
//                 : "pointer"
//           }}
//         >
//           Previous
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={!cursor}
//           style={{
//             padding: "10px 20px",
//             cursor:
//               !cursor
//                 ? "not-allowed"
//                 : "pointer"
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [cursor, setCursor] = useState(null);

  const [cursorHistory, setCursorHistory] =
    useState([]);

  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");

  const loadFirstPage = async () => {
    const data = await fetchProducts({
      category
    });

    setProducts(data.products);

    setCursor(data.nextCursor);

    setPage(1);

    setCursorHistory([]);
  };

  useEffect(() => {
    loadFirstPage();
  }, [category]);

  const handleNext = async () => {
    if (!cursor) return;

    setCursorHistory((prev) => [...prev, cursor]);

    const data = await fetchProducts({
      cursorUpdatedAt: cursor.cursorUpdatedAt,
      cursorId: cursor.cursorId,
      category
    });

    setProducts(data.products);

    setCursor(data.nextCursor);

    setPage((prev) => prev + 1);
  };

  const handlePrevious = async () => {
    if (page === 1) return;

    let previousCursor = null;

    if (page > 2) {
      previousCursor = cursorHistory[page - 3];
    }

    const data = await fetchProducts({
      cursorUpdatedAt:
        previousCursor?.cursorUpdatedAt,
      cursorId:
        previousCursor?.cursorId,
      category
    });

    setProducts(data.products);

    setCursor(data.nextCursor);

    setPage((prev) => prev - 1);

    setCursorHistory((prev) =>
      prev.slice(0, prev.length - 1)
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                color: "#111827"
              }}
            >
              Product Browser
            </h1>

            <p
              style={{
                color: "#6b7280",
                marginTop: "8px"
              }}
            >
              Browse 200,000+ products with
              fast pagination
            </p>
          </div>

          {/* FILTER */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border:
                "1px solid #d1d5db",
              fontSize: "15px",
              minWidth: "220px",
              background: "#fff"
            }}
          >
            <option value="">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Beauty">
              Beauty
            </option>
          </select>
        </div>

        {/* PAGE INFO */}
        <div
          style={{
            marginBottom: "20px",
            fontWeight: "600",
            color: "#374151",
            fontSize: "18px"
          }}
        >
          Page {page}
        </div>

        {/* PRODUCT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "40px"
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background:
                page === 1
                  ? "#d1d5db"
                  : "#111827",
              color: "#fff",
              fontSize: "15px",
              cursor:
                page === 1
                  ? "not-allowed"
                  : "pointer",
              transition: "0.3s"
            }}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!cursor}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background:
                !cursor
                  ? "#d1d5db"
                  : "#2563eb",
              color: "#fff",
              fontSize: "15px",
              cursor:
                !cursor
                  ? "not-allowed"
                  : "pointer",
              transition: "0.3s"
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

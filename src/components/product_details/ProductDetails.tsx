import { useParams, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";
import { Header } from "../layout/Header";
import { Product } from "../../types";
import { ProductCard } from "../product/ProductCard";

interface ProductDetailsProps {
  products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
      </div>
    );
  }

  const priceData = product.priceHistory.map((ph) => ({
    date: ph.date,
    price: ph.price,
  }));
  const minPrice = Math.min(...priceData.map((item) => item.price));
  const maxPrice = Math.max(...priceData.map((item) => item.price));
  const currentPrice =
    product.currentPrice || priceData[priceData.length - 1].price;
  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  // Calcular el cambio porcentual desde la última actualización
  const calculatePriceChange = () => {
    if (priceData.length < 2) return { percentage: 0, increased: false };

    const currentPriceValue = priceData[priceData.length - 1].price;
    const previousPriceValue = priceData[priceData.length - 2].price;

    if (previousPriceValue === 0) return { percentage: 0, increased: false };

    const change = currentPriceValue - previousPriceValue;
    const percentageChange = (change / previousPriceValue) * 100;

    return {
      percentage: Math.abs(percentageChange).toFixed(2),
      increased: change > 0
    };
  };

  const priceChange = calculatePriceChange();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      ></motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-white p-6 rounded-lg shadow-md mx-auto max-w-5xl"
      >
        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
          }}
          className="bg-white rounded-2xl p-6"
        >
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-60 h-60 object-contain mx-auto" // Increase size here
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
          }}
          className="flex flex-col"
        >
          {product.category && (
            <span className="px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full mb-2">
              {product.category}
            </span>
          )}
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product.name}
          </h1>

          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-40 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 w-fit mb-6 group"
          >
            Ver producto en {product.page}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {product.description && (
            <p className="text-gray-600 mb-6">{product.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <p className="text-sm text-gray-500">Precio actual</p>
              <p className="text-3xl font-bold text-gray-800">
                ${currentPrice.toLocaleString()}
              </p>

              {/* Indicador de cambio de precio */}
              {priceChange.percentage !== "0.00" && parseFloat(priceChange.percentage) !== 0 && (
                <p className={`text-sm mt-1 ${priceChange.increased ? 'text-red-500' : 'text-green-500'} flex items-center`}>
                  <span className="mr-1">
                    {priceChange.increased ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 20a1 1 0 01-1-1V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L13 9.414V19a1 1 0 01-1 1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 4a1 1 0 011 1v9.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 14.586V5a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {priceChange.increased ? 'Aumentó' : 'Disminuyó'} {priceChange.percentage}% desde su última actualización
                </p>
              )}
            </motion.div>

            <div className="h-12 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl shadow-sm"
              >
                <p className="text-sm text-gray-600">Mínimo histórico</p>
                <p className="text-lg font-semibold text-green-600">
                  ${minPrice.toLocaleString()}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-xl shadow-sm"
              >
                <p className="text-sm text-gray-600">Máximo histórico</p>
                <p className="text-lg font-semibold text-red-600">
                  ${maxPrice.toLocaleString()}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-12 overflow-hidden mx-auto max-w-5xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Historial de Precio
        </h2>
        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Precio"]}
                labelFormatter={(label) => `Fecha: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                name="Precio"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 0, fill: "#6366f1" }}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mx-auto max-w-5xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Productos Relacionados
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {relatedProducts.map((relatedProduct, index) => (
            <motion.div
              key={relatedProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <ProductCard product={relatedProduct} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

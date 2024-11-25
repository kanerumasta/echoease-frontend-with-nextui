// components/CustomError.tsx

import { FaSadCry } from "react-icons/fa";
import { motion } from "framer-motion";

interface CustomErrorProps {
  message: string;
  onRetry: () => void;
}

const CustomError: React.FC<CustomErrorProps> = ({ message, onRetry }) => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
        className="mb-4"
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <FaSadCry className="text-red-500" size={80} />
      </motion.div>
      <h1 className="text-2xl font-bold text-red-700 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-red-600 mb-4">{message}</p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        onClick={onRetry}
      >
        Retry
      </button>
    </motion.div>
  </div>
);

export default CustomError;

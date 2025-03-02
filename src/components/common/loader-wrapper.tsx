import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface LoaderWrapperProps extends PropsWithChildren {
  loading: boolean;
  text?: string;
}

export function LoaderWrapper({ children, loading, text }: LoaderWrapperProps) {
  if (loading)
    return (
      <div className="relative h-full w-full flex flex-col gap-4 justify-center items-center bg-transparent   ">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              strokeWidth="1.5"
              fill="white"
            />
            <polygon points="12,5 8,8 10,12 14,12 16,8" fill="black" />
            <polygon points="8,8 4,9 6,13 10,12" fill="black" />
            <polygon points="16,8 20,9 18,13 14,12" fill="black" />
            <polygon points="6,13 8,17 12,15 10,12" fill="black" />
            <polygon points="18,13 16,17 12,15 14,12" fill="black" />
          </svg>
        </motion.div>
        <p className="text-lg font-semibold text-gray-700">
          {text ? text : "Cargando..."}
        </p>
      </div>
    );

  return <>{children}</>;
}

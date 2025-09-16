"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";

export default function BottomSheet({ open, onClose, product, onConfirm }) {
  const [selectedSizes, setSelectedSizes] = useState({}); // {image: size}
  const [quantities, setQuantities] = useState({}); // {image: quantity}

  if (!product) return null;

  const images = Array.isArray(product.images) ? product.images : [];
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : [];

  const handleSizeSelect = (image, size) => {
    setSelectedSizes((prev) => ({ ...prev, [image]: size }));
  };

  const increment = (image) => {
    setQuantities((prev) => ({
      ...prev,
      [image]: (prev[image] || 0) + 1,
    }));
  };

  const decrement = (image) => {
    setQuantities((prev) => ({
      ...prev,
      [image]: Math.max((prev[image] || 0) - 1, 0),
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* الخلفية */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* البانل */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 lg:w-[50%] h-[50%] lg:h-[80%] m-auto  bg-white rounded-t-2xl p-6 z-50 max-h-[80vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* العنوان */}
            <div className="flex flex-col items-center mb-5">
              <Image
                src={product.thumbnail ?? "/placeholder.png"}
                alt={product.title || "Product Image"}
                width={150}
                height={150}
                className="rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              {typeof product.price === "number" && (
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              )}
            </div>

            {/* الصور × المقاسات */}
            {images.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {images.map((image, idx) => (
                  <div key={idx} className="flex justify-between items-center border p-3 rounded-md">
                    {/* الصورة + التفاصيل */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={image}
                        alt={`Variation ${idx}`}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-700">Variation {idx + 1}</p>

                        {/* اختيار المقاس إذا موجود */}
                        {sizes.length > 0 && (
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(image, size)}
                                className={`border rounded-md px-2 py-1 text-sm ${
                                  selectedSizes[image] === size
                                    ? "bg-amber-400 text-white border-amber-400"
                                    : "border-gray-300"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* أزرار التحكم بالكمية لكل صورة */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrement(image)}
                        className="px-3 py-1 border rounded-md"
                      >
                        -
                      </button>
                      <span className="text-lg">{quantities[image] || 0}</span>
                      <button
                        onClick={() => increment(image)}
                        className="px-3 py-1 border rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No options available</p>
            )}

            {/* زر التأكيد */}
            <button
              onClick={() => {
                const selections = images
                  .filter((img) => quantities[img] > 0)
                  .map((img) => ({
                    ...product,
                    image: img,
                    size: selectedSizes[img] || null,
                    quantity: quantities[img],
                    price: product.price ?? 0,
                  }));

                if (selections.length === 0) {
                  toast.error("Please select at least one variation");
                  return;
                }

                selections.forEach((s) => onConfirm(s));
                toast.success("Added to cart successfully!");
                onClose();
              }}
              className="w-full py-3 mt-5 rounded-md bg-amber-500 text-white hover:bg-amber-600"
            >
              Confirm & Add to Cart
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

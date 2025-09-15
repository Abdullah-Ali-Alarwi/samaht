"use client";
import Producitem from './Producitem';
import useProductStore from '@/src/store/ProductsStore';
import React, { useEffect } from 'react';

export default function Page() {
  const { fetchProducts, loading, error, getFilteredProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = getFilteredProducts();

  return (
    <div className="w-[90%] m-auto mt-[200px]">
      <h1 className="text-left text-2xl font-bold my-5 text-yellow-400">Product Page</h1>

      {/* حالة التحميل */}
      {loading && <p className="text-center my-5">Loading products...</p>}

      {/* حالة الخطأ */}
      {error && <p className="text-center my-5 text-red-500">{error}</p>}

      {/* عرض المنتجات بعد الفلترة */}
      {!loading && !error && (
        <div className="flex  gap-2 lg:gap-3 flex-wrap m-auto justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Producitem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center w-full my-5">No products found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

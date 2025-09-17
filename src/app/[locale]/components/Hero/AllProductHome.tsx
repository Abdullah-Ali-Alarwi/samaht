"use client";
import Producitem from '@/src/app/[locale]/(AllPages)/ProductPage/Producitem';
import useProductStore from '@/src/store/ProductsStore';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { fetchProducts, loading, error, getFilteredProducts } = useProductStore();

  // 📌 حالة لحفظ الصفحة الحالية
  const [currentPage, setCurrentPage] = useState(1);

  // 📌 عدد المنتجات في كل صفحة
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = getFilteredProducts();

  // 📌 حساب عدد الصفحات الكلي
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 📌 تحديد المنتجات المعروضة حسب الصفحة الحالية
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className=" m-auto">
      <h1 className="text-left text-2xl font-bold my-5 mx-7 text-yellow-400">Product Page</h1>

      {/* حالة التحميل */}
      {loading && <p className="text-center my-5">Loading products...</p>}

      {/* حالة الخطأ */}
      {error && <p className="text-center my-5 text-red-500">{error}</p>}

      {/* عرض المنتجات بعد الفلترة */}
      {!loading && !error && (
        <>
          <div className="flex lg:gap-3 flex-wrap m-auto  lg:mx-7 justify-around ">
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <Producitem key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center w-full my-5">No products found for this category.</p>
            )}
          </div>

          {/* 📌 الباجنيشن */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 my-8">
              {/* زر السابق */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {/* أرقام الصفحات */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* زر التالي */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

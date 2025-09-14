"use client"
import MainHero from '@/src/app/[locale]/components/MainHero';
import AllProductHome from '@/src/app/[locale]/components/Hero/AllProductHome';
import useProductStore from '@/src/store/ProductsStore';
import { useEffect } from "react";

export default function HomePage() {
  const { products, fetchProducts } = useProductStore();
  
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return (
    <div>
      <MainHero />
    
      <AllProductHome />
     
    </div>
  );
}

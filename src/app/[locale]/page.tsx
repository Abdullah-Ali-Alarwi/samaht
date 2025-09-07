"use client"
import MainHero from '@/src/app/[locale]/components/MainHero';
import Products from '@/src/app/[locale]/components/ProductsComponents/Products';
import Image from 'next/image';
import sale from '@/public/image/sale.svg';
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
      <Products title="Products" />
      <Products title="Latest offer" />
      <div className='bg-amber-300 flex justify-center items-center p-5 my-5'>
        <Image src={sale} alt="Description" width={500} height={300} />
      </div>
      <Products title="Products for women" />
      <Products title="Products for men" />
    </div>
  );
}

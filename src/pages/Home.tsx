import { FC, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TrendingProducts from "../components/TrendingProducts";
import { useAppDispatch } from "../redux/hooks";
import { updateNewList, updateFeaturedList } from "../redux/features/productSlice";
import { Product } from "../models/Product";
import LatestProducts from "../components/LatestProducts";
import Banner from "../components/Banner";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = () => {
      fetch("http://localhost:5000/product")
        .then((res) => res.json())
        .then((products) => { // Directly accessing the array here
          console.log("API Response:", products); // Logging the array

          if (products && products.length > 0) {
            const productList: Product[] = products.map((product: Product) => ({
              _id: product._id,
              name: product.name,
              images: product.images,
              price: product.price,
              rating: product.rating,
              image: product.image,
              description: product.description,
              category: product.category,
              discountPercentage: product.discountPercentage,
            }));

            dispatch(updateFeaturedList(productList.slice(0, 8)));
            dispatch(updateNewList(productList.slice(8, 16)));
          } else {
            console.error("No products found in API response.");
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="dark:bg-slate-800">
      <HeroSection />
      <Features />
      <TrendingProducts />
      <Banner />
      <LatestProducts />
      <br />
    </div>
  );
};

export default Home;

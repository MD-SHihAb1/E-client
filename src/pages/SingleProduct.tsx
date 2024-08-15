// SingleProduct.tsx
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import { Product } from "../models/Product";
import RatingStar from "../components/RatingStar";
import PriceSection from "../components/PriceSection";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import ProductList from "../components/ProductList";
import Reviews from "../components/Reviews";
import useAuth from "../hooks/useAuth";
import { MdFavoriteBorder } from "react-icons/md";
import { addToWishlist } from "../redux/features/productSlice";
import { CartItem } from "../models/CartItem";

const SingleProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { _id } = useParams<{ _id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [imgs, setImgs] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [sCategory, setScategory] = useState<string>('');
  const [similar, setSimilar] = useState<Product[]>([]);
  const { requireAuth } = useAuth();

  useEffect(() => {
    if (_id) {
      fetch(`http://localhost:5000/product/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setImgs([data.image]);
          setSelectedImg(data.image);
          setScategory(data.category);
        })
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [_id]);

  useEffect(() => {
    if (sCategory) {
      fetch(`http://localhost:5000/product/category/${sCategory}`)
        .then((res) => res.json())
        .then((data) => {
          const _products: Product[] = data.products;
          const filtered = _products.filter((product) => product._id !== _id);
          setSimilar(filtered);
        })
        .catch((err) => console.error('Error fetching similar products:', err));
    }
  }, [sCategory, _id]);

  const addCart = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToCart({
          _id: product._id,
          price: product.price,
          title: product.name,
          category: product.category,
          rating: product.rating,
          thumbnail: product.image,
          discountPercentage: 0,
          quantity: 1,
        }));
        toast.success("Item added to cart successfully", {
          duration: 3000,
        });
      }
    });
  };

  const buyNow = () => {
    requireAuth(() => {
      if (product) {
        addCart();
        dispatch(setCartState(true));
      }
    });
  };

  const addWishlist = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToWishlist(product));
        toast.success("Item added to your wishlist", {
          duration: 3000,
        });
      }
    });
  };

  return (
    <div className="container mx-auto pt-8 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        <div className="space-y-2">
          <img src={selectedImg} alt="selected" className="h-80" />
          <div className="flex space-x-1 items-center">
            {imgs.map((_img) => (
              <img
                src={_img}
                key={_img}
                alt="thumb"
                className={`w-12 cursor-pointer hover:border-2 hover:border-black ${
                  _img === selectedImg ? "border-2 border-black" : ""
                }`}
                onClick={() => setSelectedImg(_img)}
              />
            ))}
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-2xl">{product?.name}</h2>
          {product?.rating && <RatingStar rating={product.rating} />}
          <div className="mt-1">
            {product?.price && (
              <PriceSection
                discountPercentage={0} // Assuming no discount
                price={product.price}
              />
            )}
          </div>
          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Brand</td>
                <td>{product?.brand}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Stock</td>
                <td>{product?.stock}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">
              {product?.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-2 space-x-2">
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 hover:bg-pink-700 text-white p-2 rounded bg-pink-500"
              onClick={addCart}
            >
              <AiOutlineShoppingCart />
              <span>ADD TO CART</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={buyNow}
            >
              <FaHandHoldingDollar />
              <span>BUY NOW</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
              onClick={addWishlist}
            >
              <MdFavoriteBorder />
              <span>ADD TO WISHLIST</span>
            </button>
          </div>
        </div>
        {product && <Reviews id={product._id} />}
      </div>
      <hr className="mt-4" />
      <ProductList title="Similar Products" products={similar} />
      <br />
    </div>
  );
};

export default SingleProduct;

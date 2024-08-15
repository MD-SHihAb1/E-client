import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCategories } from "../redux/features/productSlice";
import { Link } from "react-router-dom";

const AllCategories: FC = () => {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(
    (state) => state.productReducer.categories
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/productCategory");
        const data = await response.json();
        dispatch(addCategories(data));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    if (Array.isArray(allCategories) && allCategories.length === 0) {
      fetchCategories();
    }
  }, [allCategories, dispatch]);

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <span className="text-lg dark:text-white">Categories</span>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 my-2">
        {Array.isArray(allCategories) && allCategories.map((category) => (
          <div
            key={category._id} // Use a unique key such as _id for each item
            className="bg-gray-100 dark:bg-slate-600 dark:text-white px-4 py-4 font-karla mr-2 mb-2"
          >
            <div className="text-lg">{category.name}</div> {/* Use the name property */}
            <Link
              to={`/product/category/${category.slug}`} // Use the slug property
              className="hover:underline text-blue-500"
            >
              View products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;

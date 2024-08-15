import { useLoaderData, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaUtensils } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  

  const [product, setProduct] = useState<Product | null>(null);

  const { _id } = useParams<{ _id: string }>();

  const axiosSecure = useAxiosPublic();



  useEffect(() => {
    if (_id) {
      fetch(`http://localhost:5000/product/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          console.log(data)
          
        })
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [_id]);




  
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const productItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const productRes = await axiosPublic.patch(`/product/${_id}`, productItem);
      console.log(productRes.data);
      if (productRes.data.modifiedCount > 0) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is Updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log('with image url', res.data);
  
  };


  const handleUpdate = product => {
    axiosSecure.patch(`/product/${product._id}`)
    .then(res => {
      console.log(res.data)
      if(res.data.modifiedCount > 0){
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${product.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }















  return (
    <div>
        <div className="flex justify-center items-center  h-screen bg-white">
        <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 bg-blue-500 text-center p-2 text-white rounded-md">Add a New Item</h2>
     <div>
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Title */}
          <div className="">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Name 
      </label>
      <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={product?.name}
              placeholder="Name "
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            />
      {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"> */}
      

    </div>

          {/* Category */}
          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Category*</label>
            <select
              defaultValue={product?.category}
              {...register("category", { required: true })}
              
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option disabled value="default">Select a category</option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Price*</label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              defaultValue={product?.price}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Stock */}

          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Stock</label>
            <input
              {...register("stock", { required: true })}
              type="number"
              placeholder="Stock"
              defaultValue={product?.stock}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Brand */}

          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Brand</label>
            <input
              {...register("brand", { required: true })}
              type="text"
              placeholder="Brand"
              defaultValue={product?.brand}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          {/* Rating */}

          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Rating</label>
            <input
              {...register("rating", { required: true })}
              type="number"
              placeholder="Rating"
              defaultValue={product?.rating}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

        </div>

        {/* Description */}
        <div className="form-group mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
          <textarea
            {...register("description")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Description"
            defaultValue={product?.description}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-group mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Image*</label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div>
        <div className="flex flex-wrap -mx-3 mb-6">
   
  </div>
        </div>

        <button
        onClick={() => handleUpdate(product)}
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Item 
        </button>
      </form>
     </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default UpdateItem;

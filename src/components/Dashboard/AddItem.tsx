import { useForm, SubmitHandler } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Define TypeScript interface for form data
interface FormData {
  name: string;
  category: string;
  price: number;
  description?: string;
  image: FileList;
  stock: number;
  brand: string;
  rating: number;
  title: string;


}

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and get an url

    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
      headers: {'Content-Type': 'multipart/form-data'

      }
    });
    
    if(res.data.success){
      // now send the menu item data to the server with the image url
      const productItem = {
        name: data.name,
        stock: data.stock,
        rating: data.rating,
        brand: data.brand,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        image: res.data.data.display_url
          }
          // 
          const productRes = await axiosPublic.post('product', productItem);
          console.log(productRes.data)
          if(productRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is Added to the menu`,
              showConfirmButton: false,
              timer: 1500
            });
          }

    }
    console.log('with image url', res.data)

  };

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
              placeholder="Name "
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            />
      {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"> */}
      

    </div>

          {/* Category */}
          <div className="form-group">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Category*</label>
            <select
              defaultValue="default"
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
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Item <FaUtensils className="ml-2" />
        </button>
      </form>
     </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default AddItems;

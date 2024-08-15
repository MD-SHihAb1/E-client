import React, { FC, useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogin, updateModal } from "../redux/features/authSlice";
import { FaUnlock } from "react-icons/fa";
import {
  RiLockPasswordFill,
  RiMailSettingsLine,
  RiMapPinUserLine,
  RiPencilLine,
  RiUser3Fill,
} from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/Providers/AuthProvider";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from "../hooks/useAxiosPublic";

const LoginModal: FC = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [clicked, setClicked] = useState(false);
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.authReducer.modalOpen);
  const { signIn, createUser, updateUserProfile } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    if (!signIn) return;
    try {
      const result = await signIn(data.email, data.password);
      console.log(result.user);
      dispatch(doLogin({ username: data.email, password: data.password }));
      dispatch(updateModal(false));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const onSubmit = async (data: { name: string; photoURL: string; email: string; password: string }) => {
    if (!createUser || !updateUserProfile) return;
    try {
      const result = await createUser(data.email, data.password);
      console.log(result.user);
      
      await updateUserProfile(data.name, data.photoURL);

      // Add user info to the database
      const userInfo = {
        name: data.name,
        email: data.email,
        image: data.photoURL,
        role:"User",
      };
      console.log("Image URL:", data.photoURL);

      await axiosPublic.post("/users", userInfo);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      dispatch(doLogin({ username: data.email, password: data.password }));
      dispatch(updateModal(false));
      reset();
    }
  };

  if (open) {
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla">
        <div className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40 dark:bg-slate-800 dark:text-white">
          <RxCross1
            className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
            onClick={() => dispatch(updateModal(false))}
          />
          {clicked ? (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <GiArchiveRegister />
                <h3 className="font-bold text-center text-xl">Register</h3>
                <GiArchiveRegister />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiPencilLine className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    {...register("photoURL", { required: true })}
                    placeholder="Photo URL"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiMapPinUserLine className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiMailSettingsLine className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                />
              </form>
              <div>
              <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setClicked(false)}
                >
                  Go to login
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <FaUnlock />
                <h3 className="font-bold text-center text-2xl">Login</h3>
                <FaUnlock />
              </div>
              <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Your email here..."
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Your password here..."
                    className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
                />
              </form>
              <p className="text-center mt-1">
                No Account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => setClicked(true)}>
                  Register
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default LoginModal;

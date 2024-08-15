import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Providers/AuthProvider";

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface UserInfo {
  id: number;
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  address: Address;
  company: Company;
  university: string;
}

const Profile: FC = () => {
  const [info, setInfo] = useState<UserInfo>();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log(user.email); // Only log if user is not null
      console.log(user.displayName);
      console.log(user.photoURL)
      console.log(user)
    } else {
      console.log("User is not available");
    }

    
  }, [user]);

  return (
    <div className="container mx-auto min-h-[83vh] w-full max-w-5xl dark:text-white">
      <h1 className="text-4xl p-4 font-bold font-lora">Your Account</h1>
      <div className="font-karla grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 p-4">
       <div className="">
         {user?.photoURL && (
          <img src={user.photoURL} alt="" className="text-center" />
        )}
       </div>
        
          <div className="avatar">
      <div className="w-24 rounded-xl">
        
      </div>
    </div>
        <table>
          <tbody>
            <tr>
              <td className="font-bold">Name</td>
              <td>{user?.displayName || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold">Email</td>
              <td>{user?.email || 'N/A'}</td>
            </tr>
            <tr>
              <td className="font-bold">Phone</td>
              <td>{user?.phone || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default Profile;

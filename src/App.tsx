import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SingleProduct from "./pages/SingleProduct";
import LoginModal from "./components/LoginModal";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllProducts from "./pages/AllProducts";
import ScrollToTopButton from "./components/ScrollToTopButton";
import BannerPopup from "./components/BannerPopup";
import AllCategories from "./pages/AllCategories";
import SingleCategory from "./pages/SingleCategory";
import AuthProvider from "./components/Providers/AuthProvider";
import SideNav from "../src/components/Dashboard/SideNav";
import Navbar from "./components/Navbar";
import AddItem from "../src/components/Dashboard/AddItem";
import UpdateItem from "./components/Dashboard/UpdateItem";
import UpdateTable from "./components/Dashboard/UpdateTable";
import AllUser from "./components/Dashboard/AllUsers";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/d');

  return (
    <AuthProvider>
      <Provider store={store}>
        {!isDashboardRoute && <Navbar />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/product/:_id" element={<SingleProduct />} />
          <Route path="/product/category/:category" element={<SingleCategory />} />

          <Route path="/wishlist" element={<ProtectedRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route path="/account" element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
          </Route>

          {/* Dashboard routes */}
          <Route path="/d/*" element={<SideNav />}>
            <Route path="add" element={<AddItem />} />
            <Route path="t" element={<UpdateTable/>} />
            <Route path="user" element={<AllUser/>} />
            <Route 
              path="update/:_id" 
              element={<UpdateItem />}
              
            />
          </Route>

        </Routes>

        {!isDashboardRoute && (
          <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Footer />
          </>
        )}

        <Cart />
        <LoginModal />
        <ScrollToTopButton />
        
        {!isDashboardRoute && <BannerPopup />}
      </Provider>
    </AuthProvider>
  );
}

export default App;

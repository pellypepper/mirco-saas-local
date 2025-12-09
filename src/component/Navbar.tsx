'use client';


import Register from "./auth/signUp";
import LoginPage from "./auth/login";
import ForgotPassword from "./auth/ForgotPassword";
import ProviderSignup from "./auth/ProviderSignup";
import useMainNavBar from "../hooks/useMainNavBar";

const Navbar = () => {
       const {
    isOpen,
    setIsOpen,
    isProviderSignup,
    setIsProviderSignup,
    isForgotPassword,
    setIsForgotPassword,
    toggleLogin,
    handleToggle,
    handleClose,
    handleProviderSignup,
    
    isLogin,
    setIsLogin,} = useMainNavBar();

  return (
    <div className="bg-primary-white rounded-xl w-full p-3 px-5 flex justify-between">
      <div>
        <h1>logo</h1>
      </div>

      <nav className="cursor-pointer">
        <ul className="flex space-x-2">
          <li
            onClick={toggleLogin}
            className="text-sm font-semibold w-18 text-primary hover:bg-chart-2/10 hover:border hover:rounded-full text-center hover:text-chart-2"
          >
            Log in
          </li>
          <li
            onClick={handleToggle}
            className="text-sm hover:bg-chart-2/10 hover:border hover:rounded-full w-18 text-center font-semibold text-primary hover:text-chart-2"
          >
            Sign up
          </li>
          <li
            onClick={handleProviderSignup}
            className="text-sm bg-chart-2/10 font-semibold w-40 text-chart-2 flex justify-center items-center rounded"
          >
            Become a provider
          </li>
        </ul>
      </nav>

      {/* Provider Signup Modal */}
      <ProviderSignup
        open={isProviderSignup}
        setIsLogin={setIsLogin}
         setIsProviderSignup={setIsProviderSignup}
        onOpenChange={setIsProviderSignup}
        onSubmit={(data) => {
          console.log("Provider form submitted:", data);
        
        }}
      />

      {/* Signup Modals */}
      {isOpen && (
        <Register
          handleClose={handleClose}
          setIsOpen={setIsOpen}
          setIsLogin={setIsLogin}
        />
      )}

          {/* Login Modals */}
      {isLogin && (
        <LoginPage
          handleClose={handleClose}
          setIsOpen={setIsOpen}
          setIsLogin={setIsLogin}
          setIsForgotPassword={setIsForgotPassword}
        />
      )}

          {/* Forgot password Modals */}
      {isForgotPassword && (
        <ForgotPassword
          setIsLogin={setIsLogin}
          setIsForgotPassword={setIsForgotPassword}
        />
      )}
    </div>
  );
};

export default Navbar;

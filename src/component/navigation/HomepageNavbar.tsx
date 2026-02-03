"use client";


import LoginPage from "../auth/login";
import ForgotPassword from "../auth/ForgotPassword";
import ProviderSignup from "../auth/ProviderSignup";
import { useMainNavBar } from "@/hooks/MainNavContext";
import MainNav from "./component/MainNav";
import HeroModal from "../../component/auth/SignUpModal"

const Navbar = () => {
  const {

     
    isForgotPassword,

  isExpanded,

setIsExpanded,
  
    isLogin,

  } = useMainNavBar();

  return (
    <>
  <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
  <MainNav />
</header>


      {/* Provider Signup Modal */}
      <ProviderSignup
       
     onSubmit={() => {}}
      />

      {/* Signup Modal */}
      {isExpanded && (
        <HeroModal
      isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        />
      )}

      {/* Login Modal */}
      {isLogin && (
        <LoginPage
       
        />
      )}

      {/* Forgot Password Modal */}
      {isForgotPassword && (
        <ForgotPassword
       
        />
      )}
    </>
  );
};

export default Navbar;

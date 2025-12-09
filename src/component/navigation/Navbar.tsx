"use client"
import { Menu, X, Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import CustomerNav from "./CustomerNav"
import ProviderNav from "./ProviderNav"
import useStripe from "@/hooks/useStripe";


const Navbar = ({  profile , handleLogout, togglePassword, open, setOpen, toggleEmail,  toggleProfile}: {  profile: any , handleLogout: () => void, open: boolean, setOpen: (open: boolean) => void, toggleEmail: () => void, toggleProfile: () => void, togglePassword: () => void }) => {


    const role = profile?.role?.toLowerCase();
    
    const {createStripeLink} = useStripe({profile});


     const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false); // ⬅️ Close when clicking outside
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, setOpen]);

   

  return (
    <div>
        <nav className="bg-primary-white flex justify-between items-center rounded-xl w-full p-3 px-5 ">
            <h1>logo</h1>


<div className="flex gap-2">
     {role === "provider" && (
          <button
            onClick={createStripeLink}
            className={`
              group relative px-3 py-2 md:px-6 md:py-2.5 rounded-lg font-medium text-sm md:text-base
              transition-all duration-300 ease-out
              flex items-center gap-1.5 md:gap-2.5
              ${profile?.payout_enabled 
                ? 'bg-gradient-to-r from-chart-2 to-chart-3  text-white shadow-md hover:shadow-lg hover:scale-105' 
                : 'bg-chart-3 text-white shadow-md hover:shadow-lg hover:scale-105 hover:from-chart-2/80 hover:to-chart-3/80'
              }
            `}
          >
            {profile?.payout_enabled ? (
              <>
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Bank Connected</span>
                <span className="sm:hidden">Connected</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 md:h-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Connect Bank</span>
                <span className="sm:hidden">Connect</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        )}

    <button
      onClick={() => setOpen(!open)}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {open ? <X className="w-6 h-6 text-gray-900" /> : <Menu className=" w-6 h-6 text-gray-900" />}
    </button>

</div>
          {open && (
            <div ref={menuRef} className="absolute z-90  bg-primary-white  w-[200px]  top-17 right-5 mt-4">
              { role === 'provider' ? (<ProviderNav onChangeEmail={toggleEmail} onChangePassword={togglePassword} setOpen={setOpen} toggleProfile={toggleProfile}  handleLogout={handleLogout} />) : (<CustomerNav onChangePassword={togglePassword}  onChangeEmail={toggleEmail} setOpen={setOpen} toggleProfile={toggleProfile} handleLogout={handleLogout} />)}
            </div>
          )}

        </nav>
    </div>
  )
}

export default Navbar

"use client"
import { Menu, X, Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import CustomerNav from "./CustomerNav"
import ProviderNav from "./ProviderNav"
import useStripe from "@/hooks/useStripe";
import AdminNav from "./AdminNav";


const Navbar = ({  profile ,user, handleLogout, togglePassword, open, setOpen, toggleEmail,  toggleProfile}: {  profile: any , handleLogout: () => void, open: boolean, setOpen: (open: boolean) => void, toggleEmail: () => void, toggleProfile: () => void, togglePassword: () => void , user: any }) => {


    const role = profile?.role?.toLowerCase();
    
    const {createStripeLink} = useStripe({profile});


     const menuRef = useRef<HTMLDivElement>(null);


      // Close menu when clicking outside
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
        <div className="">
             {role === "admin" ? (
        <AdminNav user={user} profile={profile} handleLogout={handleLogout}  />
      ) :   <div>
        <nav className="sticky top-0 z-50  bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800  flex justify-between items-center  w-full p-3 px-5 ">
         <div>
              <h1 className="text-xl font-bold text-white">
                Service<span className="text-chart-2">Hub</span>
              </h1>
        
            </div>


<div className="flex gap-2">
     {role === "provider" && (
          <button
            onClick={createStripeLink}
            className={`
              group relative px-3 py-2 md:px-6 md:py-2.5 rounded-lg font-medium text-sm md:text-base
              transition-all duration-300 ease-out
              flex items-center gap-1.5 md:gap-2.5
              ${profile?.payout_enabled 
                ? 'bg-[#023047] border-chart-2 border-2 text-white shadow-md hover:shadow-lg hover:scale-105' 
                : 'bg-chart-2 text-white shadow-md hover:shadow-lg hover:scale-105 hover:from-chart-2/80 hover:to-chart-3/80'
              }
            `}
          >
            {profile?.payout_enabled ? (
              <>
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#008800]" />
                <span className="hidden sm:inline">Bank Connected</span>
                <span className="sm:hidden">Connected</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Connect Bank</span>
                <span className="sm:hidden">Connect</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        )}

    <button
      onClick={() => setOpen(!open)}
      className="p-1 md:p-2 rounded-md border  border-white/80  hover:bg-chart-2  transition"
    >
      {open ? <X className="w-6 h-6 text-white" /> : <Menu className=" w-6 h-6 text-white" />}
    </button>

</div>
          {open && (
            <div ref={menuRef} className="absolute z-90   bg-zinc-950/80 backdrop-blur-xl border border-white/10 w-[200px]  top-12 right-5 mt-4">
              { role === 'provider' ?
               (<ProviderNav onChangeEmail={toggleEmail} onChangePassword={togglePassword} setOpen={setOpen} toggleProfile={toggleProfile}  handleLogout={handleLogout} />)
                : (<CustomerNav onChangePassword={togglePassword}  onChangeEmail={toggleEmail} setOpen={setOpen} toggleProfile={toggleProfile} handleLogout={handleLogout} />)}
            </div>
          )}

        </nav>
    </div>}
        </div>
  )
}

export default Navbar

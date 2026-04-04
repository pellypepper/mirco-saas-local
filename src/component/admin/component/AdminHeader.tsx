'use client';


const AdminHeader = ({ isDarkMode }: { isDarkMode: boolean }) => {
 


  return (
    <div className={`mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-slate-600 text-base md:text-lg mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>
    </div>
  );
};

export default AdminHeader;

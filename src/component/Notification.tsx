"use client";

const Notification = ({ showNotification, setShowNotification, notifications }: { showNotification: boolean; setShowNotification: React.Dispatch<React.SetStateAction<boolean>>; notifications: string }) => {
  return (
  <div 
    className={`
      fixed md:top-18 top-15 right-4 
      bg-yellow-100 border-l-4 border-yellow-500 
      text-yellow-700 p-2 pr-8 rounded shadow-lg z-50
      transition-all duration-500 ease-out
      ${showNotification 
        ? 'translate-y-0 opacity-100 pointer-events-auto' 
        : '-translate-y-full opacity-0 pointer-events-none'
      }
    `}
  >
    <button
      onClick={() => setShowNotification(false)}
      className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900 font-bold"
      aria-label="Close notification"
    >
      ✕
    </button>
    <p className="font-bold">Profile Incomplete</p>
    <p>{notifications}</p>
  </div>
  )
}

export default Notification

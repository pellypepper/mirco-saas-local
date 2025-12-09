
export default function Loader({ message = "Loading..." }: { message?: string }) {
  return <div className="fixed  inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-50 px-4">
    <div className="loader"></div>
    <p className="text-white">{message}</p>
  </div>;
}

export default function Layout({ children }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-[#F9FAFB] text-black rounded-2xl shadow-lg p-6 border border-gray-200">
        {children}
      </div>
    </div>
  );
}

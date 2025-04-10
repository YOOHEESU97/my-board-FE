import Footer from "./Footer";
import Header from "./Header";
import FloatingButton from "./FloatingButton";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/*<Header />*/}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-xl p-6">
          {children}
        </div>
      </div>
      <Footer />
      <FloatingButton />
    </div>
  );
}

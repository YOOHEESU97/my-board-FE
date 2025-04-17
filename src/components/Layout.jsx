import Footer from "./Footer";
import Header from "./Header";
import FloatingButton from "./FloatingButton";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/*<Header />*/}

      <main className="flex-grow w-full flex justify-center px-4 py-10 overflow-y-auto">
        <div className="w-full max-w-3xl">{children}</div>
      </main>

      <Footer />
      <FloatingButton />
    </div>
  );
}

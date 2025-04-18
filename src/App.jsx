import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={false}
        closeOnClick={false}
        draggable={false}
        hideProgressBar
        toastClassName="!w-full !flex !justify-center !items-center"
        bodyClassName="text-center"
      />
    </BrowserRouter>
  );
}

export default App;

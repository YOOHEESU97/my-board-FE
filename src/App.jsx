import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

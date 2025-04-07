import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostList from "./pages/PostList";
import PostWrite from "./pages/PostWriter";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/write" element={<PostWrite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

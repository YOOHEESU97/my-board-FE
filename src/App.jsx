import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PostList from "./pages/PostList";
import PostWrite from "./pages/PostWriter";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/posts"
          element={
            <Layout>
              <PostList />
            </Layout>
          }
        />
        <Route
          path="/posts/write"
          element={
            <Layout>
              <PostWrite />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

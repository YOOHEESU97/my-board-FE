// src/Router.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostList from "./pages/PostList.jsx";
import PostWrite from "./pages/PostWriter.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import MyPage from "./pages/MyPage.jsx"; // 나중에 마이페이지 등도 분리 가능
import PostEdit from "./pages/PostEdit.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />
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
      <Route
        path="/posts/:id"
        element={
          <Layout>
            <PostDetail />
          </Layout>
        }
      />
      <Route
        path="/posts/:id/edit"
        element={
          <Layout>
            <PostEdit />
          </Layout>
        }
      />
      <Route
        path="/mypage"
        element={
          <Layout>
            <MyPage />
          </Layout>
        }
      />
    </Routes>
  );
}

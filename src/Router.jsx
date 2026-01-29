import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";
import PostList from "./pages/PostList.jsx";
import PostWrite from "./pages/PostWriter.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import PostEdit from "./pages/PostEdit.jsx";
import TrackDelivery from "./pages/TrackDelivery.jsx";
import TrackResult from "./pages/TrackResult.jsx";

/**
 * Router: 애플리케이션 라우팅 설정
 * - React Router v6 사용
 * - 모든 페이지는 Layout 컴포넌트로 감싸져 Header/Footer 공통 레이아웃 적용
 * - ProtectedRoute: 인증이 필요한 페이지 보호
 * 
 * 라우트 구조:
 * - / : 홈으로 리다이렉트
 * - /home : 메인 홈 (보호된 라우트)
 * - /login, /register : 인증 페이지
 * - /posts : 게시판 (목록, 상세, 작성, 수정)
 * - /trackDelivery : 배송 조회
 * - /mypage : 마이페이지
 */
export default function Router() {
  return (
    <Routes>
      {/* 루트 경로는 홈으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* 인증 관련 페이지 */}
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
      
      {/* 게시판 관련 페이지 */}
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
      
      {/* 마이페이지 */}
      <Route
        path="/mypage"
        element={
          <Layout>
            <MyPage />
          </Layout>
        }
      />
      
      {/* 홈 (보호된 라우트 - 로그인 필요) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      {/* 배송 조회 관련 페이지 */}
      <Route
        path="/trackDelivery"
        element={
          <Layout>
            <TrackDelivery />
          </Layout>
        }
      />
      <Route
        path="/trackDelivery/result"
        element={
          <Layout>
            <TrackResult />
          </Layout>
        }
      />
    </Routes>
  );
}

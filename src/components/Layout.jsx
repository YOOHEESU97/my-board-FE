import Footer from "./Footer";
import Header from "./Header";
import FloatingButton from "./FloatingButton";

/**
 * Layout: 모든 페이지에 공통으로 적용되는 레이아웃 컴포넌트
 * - 헤더 (현재 안씀)
 * - 메인 콘텐츠 영역 (children)
 * - 하단 Footer
 * - 글쓰기 버튼
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 (현재 주석처리) */}
      {/* <Header /> */}

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow w-full flex justify-center px-4 py-10 pb-20">
        <div className="w-full max-w-3xl">{children}</div>
      </main>

      {/* 하단 Footer */}
      <Footer />
      
      {/* 글쓰기 버튼 */}
      <FloatingButton />
    </div>
  );
}

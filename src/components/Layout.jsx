import Footer from "./Footer";
import Header from "./Header";
import FloatingButton from "./FloatingButton";

/**
 * Layout: 모든 페이지에 공통으로 적용되는 레이아웃 컴포넌트
 * - 헤더 (현재 주석 처리됨)
 * - 메인 콘텐츠 영역 (children)
 * - 하단 네비게이션 바 (Footer)
 * - 글쓰기 플로팅 버튼
 * 
 * 구조:
 * - 전체 화면 높이 (min-h-screen)
 * - Flexbox로 Header/Main/Footer 구성
 * - Main 영역은 flex-grow로 남은 공간 차지
 * - 최대 너비 3xl로 콘텐츠 중앙 정렬
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 (현재 미사용 - 필요시 주석 해제) */}
      {/* <Header /> */}

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow w-full flex justify-center px-4 py-10 overflow-y-auto">
        <div className="w-full max-w-3xl">{children}</div>
      </main>

      {/* 하단 네비게이션 바 (고정) */}
      <Footer />
      
      {/* 글쓰기 플로팅 버튼 (고정) */}
      <FloatingButton />
    </div>
  );
}

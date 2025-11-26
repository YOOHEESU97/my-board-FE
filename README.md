# React + Vite

구현 완료
JWT 인증 access + refresh, 토큰 재발급까지 완벽
회원가입 / 로그인 | Context로 user 관리
날씨 API 위치기반, 공공데이터포털 연동
택배 API 운송장 조회, carrier 검색 포함
토스트 안내 세션만료 안내 UX 완성

구현 목표

1. 🔐 소셜 로그인 (Google, Kakao, Naver)
   JWT + OAuth 조합이면 SSO 구현도 가능

실무에서 소셜 로그인은 거의 기본

2. 📌 사용자 마이페이지
   내 정보, 비밀번호 변경, 배송 조회 내역, 최근 본 글 등

localStorage나 DB에 활동 기록 저장해서 불러오기

3. 📦 배송 조회 즐겨찾기 or 자동완성
   자주 조회한 운송장 저장 → 자동 완성으로 추천

쿠키나 localStorage로 저장

4. 🔔 푸시 알림 or 실시간 상태 갱신
   배송 상태가 배송완료로 바뀌면 알림 뜨게 (setInterval + polling)

5. 🧭 PWA 적용 → 앱처럼 사용 가능
   React에 manifest.json 넣고 Progressive Web App 설정

오프라인 모드, 홈화면 추가 가능

6. 📂 파일 업로드 + 게시판 연동
   게시판 글 작성 시 첨부파일 (썸네일 or 첨부 이미지)

FormData로 업로드 구현

7. 🧪 유닛 테스트 / 통합 테스트
   프론트: Jest + React Testing Library

백엔드: SpringBoot @WebMvcTest, @DataJpaTest

8. 📈 관리자 페이지 (어드민 대시보드)
   전체 유저/글/조회 수/배송 API 사용량 확인

관리자 계정만 접근 가능하게 Role-based 접근 제어

import { useEffect, useState } from "react";

/**
 * Fixtures: 축구 경기 일정 페이지 (현재 미사용)
 * - API-Football 연동 예정 기능
 * - 프리미어리그 경기 일정 표시
 * - 현재 라우터에 등록되지 않음 (개발 예정)
 * 
 * TODO: 향후 구현 시 고려사항
 * - API-Football API 키 발급 및 환경 변수 설정
 * - 리그/시즌 선택 기능
 * - 경기 상세 정보 (점수, 시간 등)
 * - 날짜별 필터링
 */
function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  /**
   * 축구 경기 일정 로드
   * - 백엔드를 거쳐 API-Football API 호출
   * - 현재는 개발/테스트용 코드
   */
  useEffect(() => {
    fetch("http://localhost:8080/api/fixtures")
      .then((res) => res.json())
      .then((data) => {
        // API-Football 응답 구조에 따라 조정 필요
        setFixtures(data.response || []);
      })
      .catch((err) => console.error("경기 일정 불러오기 실패:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">⚽ 프리미어리그 일정</h1>
      
      {fixtures.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          경기 일정을 불러오는 중...
        </p>
      ) : (
        <ul className="space-y-4">
          {fixtures.map((match) => (
            <li
              key={match.fixture?.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p className="font-semibold">
                {match.teams?.home?.name} vs {match.teams?.away?.name}
              </p>
              <p className="text-sm text-gray-500">
                {match.fixture?.date &&
                  new Date(match.fixture.date).toLocaleString("ko-KR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Fixtures;

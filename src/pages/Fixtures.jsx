import { useEffect, useState } from "react";

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/fixtures")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFixtures(data.response); // API-Football의 응답 구조에 따라 조정
      })
      .catch((err) => console.error("Error fetching fixtures:", err));
  }, []);

  return (
    <div>
      <h1>프리미어리그 일정</h1>
      <ul>
        {fixtures.map((match) => (
          <li key={match.fixture.id}>
            {match.teams.home.name} vs {match.teams.away.name} -{" "}
            {match.fixture.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fixtures;

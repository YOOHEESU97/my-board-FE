import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/posts/write")}
      className="fixed bottom-20 right-4 bg-green-500 text-white text-2xl rounded-full w-14 h-14 shadow-lg hover:bg-green-600 z-40"
    >
      +
    </button>
  );
}

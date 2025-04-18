export default function SessionExpiredToast({ closeToast }) {
  return (
    <div className="text-gray-800 text-center">
      <p className="font-semibold mb-2">세션이 만료되었습니다.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 min-w-[180px] whitespace-nowrap"
        onClick={() => {
          closeToast();
          window.location.href = "/login";
        }}
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}

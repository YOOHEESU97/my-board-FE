import { registerUser, checkNickname } from "../api/user";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Register() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();
  const checkButtonRef = useRef(null);

  const nicknameFeedbackStyle = isNicknameValid
    ? "text-green-600"
    : "text-red-500";

  const handleCheckNickname = async () => {
    if (!nickname) return;
    try {
      await checkNickname(nickname);
      setNicknameMessage("사용 가능한 닉네임입니다.");
      setIsNicknameValid(true);
    } catch (err) {
      setNicknameMessage("이미 사용 중인 닉네임입니다.");
      console.error(err);
      setIsNicknameValid(false);
    }
  };

  const validateForm = () => {
    if (isNicknameValid !== true) {
      setNicknameMessage("닉네임 중복 확인을 해주세요.");
      checkButtonRef.current?.focus(); // ✅ 버튼에 포커스
      return false;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setEmail("");
    setNickname("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await registerUser({
        email,
        password,
        nickname,
      });
      console.log("✅ 서버 응답:", res);
      setShowModal(true); // ✅ 모달 띄우기
      resetForm();
    } catch (error) {
      alert("회원가입 실패!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="text-sm text-gray-500 hover:text-black mb-4 flex items-center"
      >
        <span className="mr-1 text-lg">←</span> 뒤로가기
      </button>
      <h1 className="text-2xl font-bold mb-6">📝 회원가입</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">이메일</label>
          <input
            type="email"
            className="border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">닉네임</label>
          <div className="relative">
            <input
              type="text"
              className="border p-3 pr-24 rounded w-full"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameValid(null);
                setNicknameMessage("");
              }}
              placeholder="닉네임"
              required
            />
            <button
              type="button"
              onClick={handleCheckNickname}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
              ref={checkButtonRef}
            >
              중복 확인
            </button>
          </div>
          {nicknameMessage && (
            <p className={`text-sm mt-1 ${nicknameFeedbackStyle}`}>
              {nicknameMessage}
            </p>
          )}
        </div>
        {/* ✅ 회원가입 성공 모달 */}
        {showModal && (
          <Modal
            title="🎉 회원가입 완료!"
            message="이제 로그인하러 가볼까요?"
            confirmLabel="로그인하기"
            onClose={() => {
              setShowModal(false);
              nav("/login", { replace: true });
            }}
          />
        )}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            className="border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p
            className={`text-sm mt-1 ${
              password.length >= 8 ? "text-green-600" : "text-red-500"
            }`}
          >
            비밀번호는 8자 이상이어야 합니다.
          </p>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호 확인</label>
          <input
            type="password"
            className="border p-3 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

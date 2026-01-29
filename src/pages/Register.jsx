import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser, checkNickname } from "../api/user";
import Modal from "../components/Modal";

/**
 * Register: 회원가입 페이지 컴포넌트
 */
export default function Register() {
  // 폼 입력 상태
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 닉네임 중복 확인 상태
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null); // null | true | false
  
  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  
  const nav = useNavigate();
  const checkButtonRef = useRef(null); // 중복 확인 버튼 ref

  // 닉네임 피드백 메시지 스타일 (초록색/빨간색)
  const nicknameFeedbackStyle = isNicknameValid
    ? "text-green-600"
    : "text-red-500";

  /**
   * handleCheckNickname: 닉네임 중복 확인 처리
   */
  const handleCheckNickname = async () => {
    if (!nickname.trim()) return;
    
    try {
      await checkNickname(nickname);
      setNicknameMessage("사용 가능한 닉네임입니다.");
      setIsNicknameValid(true);
    } catch (err) {
      setNicknameMessage("이미 사용 중인 닉네임입니다.");
      console.error("닉네임 중복 확인 실패:", err);
      setIsNicknameValid(false);
    }
  };

  /**
   * validateForm: 폼 유효성 검사
   */
  const validateForm = () => {
    // 닉네임 중복 확인 체크
    if (isNicknameValid !== true) {
      setNicknameMessage("닉네임 중복 확인을 해주세요.");
      checkButtonRef.current?.focus();
      return false;
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    // 비밀번호 길이 확인 (8자 이상)
    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return false;
    }

    return true;
  };

  /**
   * resetForm: 폼 초기화
   * - 회원가입 성공 시 입력 필드 초기화
   */
  const resetForm = () => {
    setEmail("");
    setNickname("");
    setPassword("");
    setConfirmPassword("");
    setNicknameMessage("");
    setIsNicknameValid(null);
  };

  /**
   * handleRegister: 회원가입 처리
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await registerUser({
        email,
        password,
        nickname,
      });
      
      setShowModal(true); // 완료 모달 표시
      resetForm();
    } catch (error) {
      alert("회원가입 실패! 다시 시도해주세요.");
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="text-sm text-gray-500 hover:text-black mb-4 flex items-center transition-colors"
      >
        <span className="mr-1 text-lg">←</span> 뒤로가기
      </button>
      
      <h1 className="text-2xl font-bold mb-6">📝 회원가입</h1>
      
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {/* 이메일 입력 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">이메일</label>
          <input
            type="email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        {/* 닉네임 입력 + 중복 확인 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">닉네임</label>
          <div className="relative">
            <input
              type="text"
              className="border p-3 pr-24 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                // 닉네임 변경 시 중복 확인 상태 초기화
                setIsNicknameValid(null);
                setNicknameMessage("");
              }}
              placeholder="닉네임"
              required
            />
            {/* 중복 확인 버튼 (input 내부 우측) */}
            <button
              type="button"
              onClick={handleCheckNickname}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
              ref={checkButtonRef}
            >
              중복 확인
            </button>
          </div>
          {/* 중복 확인 피드백 메시지 */}
          {nicknameMessage && (
            <p className={`text-sm mt-1 ${nicknameFeedbackStyle}`}>
              {nicknameMessage}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호</label>
          <input
            type="password"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 입력하세요"
            required
          />
          {/* 비밀번호 길이 검증 피드백 */}
          <p
            className={`text-sm mt-1 ${
              password.length >= 8 ? "text-green-600" : "text-red-500"
            }`}
          >
            비밀번호는 8자 이상이어야 합니다.
          </p>
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">비밀번호 확인</label>
          <input
            type="password"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
          {/* 비밀번호 일치 여부 피드백 */}
          {confirmPassword && (
            <p
              className={`text-sm mt-1 ${
                password === confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {password === confirmPassword
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </p>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors mt-2"
        >
          회원가입
        </button>
      </form>

      {/* 회원가입 성공 모달 */}
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
    </div>
  );
}

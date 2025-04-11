import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { useUser } from "../context/AppContext";
import Modal from "../components/Modal";

export default function PostWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" | "error" | null
  const { user } = useUser();
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지

    if (!validateForm()) return;

    try {
      // 저장
      await createPost({
        title,
        content,
        nickname: user.nickname,
        email: user.email,
      });
      setModalType("success");
      setShowModal(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setModalType("error");
      setShowModal(true);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      return false;
    }
    if (!content.trim()) {
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="text-sm text-gray-500 hover:text-black mb-4 flex items-center"
      >
        <span className="mr-1 text-lg">←</span> 뒤로가기
      </button>
      <h1 className="text-2xl font-bold mb-6">✍️ 새 글 작성</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="border p-3 rounded"
          value={title}
          maxLength={30}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요"
          className="border p-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          작성 완료
        </button>
      </form>
      {/* ✅ 작성완료 모달 */}
      {showModal && (
        <Modal
          title={modalType === "success" ? "✅ 작성 완료!" : "❌ 작성 실패"}
          message={
            modalType === "success"
              ? "게시글이 성공적으로 등록되었습니다."
              : "게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요."
          }
          confirmLabel="확인"
          onClose={() => {
            setShowModal(false);
            setModalType(null);
            if (modalType === "success") {
              nav("/posts", { replace: true });
            }
          }}
        />
      )}
    </div>
  );
}

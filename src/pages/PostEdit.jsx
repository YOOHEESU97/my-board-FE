import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPostById, updatedPost } from "../api/post";
import Modal from "../components/Modal";

/**
 * PostEdit: 게시글 수정 페이지
 * - URL 파라미터로 게시글 ID 받기
 * - 기존 게시글 내용 불러와서 폼에 표시
 * - 수정 후 저장 시 백엔드에 PUT 요청
 * - 수정 완료 시 모달 표시 후 상세 페이지로 이동
 */
const PostEdit = () => {
  const { id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false); // 수정 성공 여부
  const [showUpdateModal, setUpdateModal] = useState(false);

  /**
   * getPost: 기존 게시글 내용 불러오기
   * - 컴포넌트 마운트 시 실행
   * - useCallback으로 메모이제이션 (id 변경 시에만 재생성)
   */
  const getPost = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      alert("게시글을 불러올 수 없습니다.");
      nav(-1); // 에러 발생 시 이전 페이지로
    }
  }, [id, nav]);

  // 컴포넌트 마운트 시 게시글 불러오기
  useEffect(() => {
    getPost();
  }, [getPost]);

  /**
   * handleSubmit: 게시글 수정 처리
   * - 백엔드에 PUT 요청
   * - 성공/실패 여부에 따라 모달 표시
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 빈 값 검증
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    
    try {
      await updatedPost(id, { title, content });
      setUpdateFlag(true);
      setUpdateModal(true);
    } catch (err) {
      setUpdateFlag(false);
      setUpdateModal(true);
      console.error("게시글 수정 실패:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">✏️ 게시글 수정</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목"
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          maxLength={30}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* 내용 입력 (textarea로 수정) */}
        <textarea
          placeholder="내용"
          className="border p-3 rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        {/* 수정 완료 버튼 */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          수정 완료
        </button>
      </form>
      
      {/* 수정 완료/실패 모달 */}
      {showUpdateModal && (
        <Modal
          title={updateFlag ? "✅ 성공" : "⚠️ 실패"}
          message={
            updateFlag
              ? "수정이 완료되었습니다."
              : "수정에 실패했습니다. 잠시 후 다시 시도해주세요."
          }
          confirmLabel="확인"
          onClose={() => nav(`/posts/${id}`)}
        />
      )}
    </div>
  );
};

export default PostEdit;

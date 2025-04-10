import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getPostById, deletePostById } from "../api/post";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  // 게시글 불러오기
  const getPost = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setPost(res.data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
      setShowModal(true);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePostById(post.id);
      setDeleteFlag(false);
      setShowDeletedModal(true);
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow">
      {post ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => nav(`/posts/${post.id}/edit`)}
                className="text-sm text-blue-500 hover:underline"
              >
                ✏️ 수정
              </button>
              <button
                onClick={() => setDeleteFlag(true)}
                className="text-sm text-red-500 hover:underline"
              >
                ❌ 삭제
              </button>
            </div>
          </div>

          {/* 작성자/날짜 */}
          <p className="text-sm text-gray-500 mb-4">
            {post.nickname} ・ {new Date(post.createAt).toLocaleString("ko-KR")}
          </p>

          {/* 내용 */}
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </>
      ) : (
        <div className="text-center p-4">⏳ 로딩 중...</div>
      )}

      {/* 모달들 */}
      {showModal && (
        <Modal
          title="⚠️ 에러"
          message="게시글을 불러오지 못했습니다."
          confirmLabel="확인"
          onClose={() => nav(-1)} // ✅ 뒤로가기
        />
      )}

      {deleteFlag && (
        <ConfirmModal
          title={"정말 삭제하시겠어요?"}
          message={"삭제된 게시글은 복구할 수 없습니다."}
          confirmLabel={"삭제하기"}
          cancelLabel={"취소"}
          onConfirm={handleDelete}
          onCancel={() => setDeleteFlag(false)}
        />
      )}

      {showDeletedModal && (
        <Modal
          title="✅ 삭제 완료"
          message="게시글이 삭제되었습니다."
          confirmLabel="확인"
          onClose={() => nav("/posts")}
        />
      )}
    </div>
  );
}

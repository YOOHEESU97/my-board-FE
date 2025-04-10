import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        setShowModal(true);
      }
    };
    getPost();
  }, [id]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow">
      {post ? (
        <>
          <h1 className="text-xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {post.nickname} ・ {new Date(post.createAt).toLocaleString("ko-KR")}
          </p>
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          <button
            onClick={() => nav(`/posts/${post.id}/edit`)}
            className="text-sm text-blue-500 hover:underline mt-4"
          >
            ✏️ 수정하기
          </button>
          <button
            onClick={() => setDeleteFlag(true)}
            className="text-sm text-blue-500 hover:underline mt-4"
          >
            💣 삭제하기
          </button>
        </>
      ) : (
        <div className="text-center p-4">⏳ 로딩 중...</div>
      )}

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
          onCancel={() => setDeleteFlag(false)}
          onConfirm={async () => {
            try {
              await deletePostById(post.id);
              setDeleteFlag(false);
              setShowDeletedModal(true);
            } catch (error) {
              console.error(error);
            }
          }}
        />
      )}
      {showDeletedModal && (
        <Modal
          title="✅ 삭제"
          message="삭제되었습니다."
          confirmLabel="확인"
          onClose={() => nav("/posts")}
        />
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { getPostById, updatedPost } from "../api/post";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";

const PostEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);

  const getPost = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatedPost(id, { title, content });
      setUpdateFlag(true);
      setUpdateModal(true);
    } catch (err) {
      setUpdateModal(true);
      console.error(err);
    }
  };

  return (
    <div className="max-w-wd mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">✏️ 게시글 수정</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="제목"
          className="border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          className="border p-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          수정 완료
        </button>
      </form>
      {showUpdateModal && (
        <Modal
          title={updateFlag ? "✅ 성공" : "⚠️ 실패"}
          message={
            updateFlag
              ? "수정이 완료되었습니다."
              : "수정에 실패했습니다. 잠시후 다시 시도바랍니다."
          }
          confirmLabel="확인"
          onClose={() => nav(`/posts/${id}`)}
        />
      )}
    </div>
  );
};

export default PostEdit;

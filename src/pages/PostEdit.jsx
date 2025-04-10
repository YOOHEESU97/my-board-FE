import { useEffect, useState } from "react";
import { getPostById, updatedPost } from "../api/post";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getPostById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
        //모달로 alert("게시글 정보를 불러올 수 없습니다.");
      }
    };
    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id, title, content);
      await updatedPost(id, { title, content });
      console.log("✅ 수정 완료!"); // ← 이게 찍히는지 확인
      // 모달
      //nav(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      // 모달
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
    </div>
  );
};

export default PostEdit;

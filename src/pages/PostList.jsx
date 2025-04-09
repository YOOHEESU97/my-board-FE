import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/post";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };
    loadPosts();
  }, []);
  return (
    <div className="max-w-md w-full bg-gray-50 rounded-xl shadow-lg p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 게시글 목록</h1>
        <Link
          to="/posts/write"
          className="text-green-600 text-sm font-semibold hover:underline"
        >
          + 글쓰기
        </Link>
      </div>

      {/* 게시글 목록 */}
      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            아직 게시글이 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {post.nickname} ・ {new Date(post.createAt).toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

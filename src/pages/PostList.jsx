import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPosts } from "../api/post";

/**
 * PostList: 게시글 목록 페이지
 * - 전체 게시글 목록 조회 및 표시
 * - 각 게시글 클릭 시 상세 페이지로 이동
 * - 우상단에 글쓰기 링크 제공
 */
export default function PostList() {
  const [posts, setPosts] = useState([]);

  /**
   * 게시글 목록 로드
   * - 컴포넌트 마운트 시 전체 게시글 조회
   */
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow">
      {/* 헤더 (제목 + 글쓰기 링크) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 게시글 목록</h1>
        <Link
          to="/posts/write"
          className="text-green-600 text-sm font-semibold hover:underline transition-colors"
        >
          + 글쓰기
        </Link>
      </div>

      {/* 게시글 목록 */}
      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          // 게시글이 없을 때
          <p className="text-gray-500 text-sm text-center py-10">
            아직 게시글이 없습니다.
          </p>
        ) : (
          // 게시글 목록 표시
          posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              {/* 게시글 제목 */}
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>
              {/* 작성자 + 작성일 */}
              <p className="text-sm text-gray-500 mt-1">
                {post.nickname} ・{" "}
                {new Date(post.createAt).toLocaleString("ko-KR")}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

const dummyPosts = [
  {
    id: 1,
    title: "첫 번째 게시글입니다!",
    author: "홍길동",
    createdAt: "2025-04-07",
  },
  {
    id: 2,
    title: "두 번째 글도 있어요.",
    author: "이몽룡",
    createdAt: "2025-04-06",
  },
];

export default function PostList() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 게시판</h1>
        <Link
          to="/posts/write"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + 글쓰기
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {dummyPosts.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="border rounded-xl p-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {post.author} ・ {post.createdAt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

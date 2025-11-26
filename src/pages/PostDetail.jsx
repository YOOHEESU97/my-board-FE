// PostDetail.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react"; // ✅ useMemo 추가
import { getPostById, deletePostById } from "../api/post";
import { fetchComments, createComment } from "../api/comment"; // ✅ 댓글 관련
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

/**
 * ✅ flat한 comments 배열을 트리 구조로 변환하는 유틸 함수
 *    - parentId === null → 루트 댓글
 *    - 나머지는 parentId 기준으로 부모의 children에 붙임
 */
function buildCommentTree(comments) {
  const map = new Map();
  const roots = [];

  // 각 댓글을 node로 감싸고 children 배열 추가
  comments.forEach((c) => {
    map.set(c.id, { ...c, children: [] });
  });

  // parentId에 따라 부모 밑에 붙이기
  map.forEach((node) => {
    if (node.parentId == null) {
      roots.push(node);
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // 부모를 못 찾는 데이터는 안전하게 루트로 처리
        roots.push(node);
      }
    }
  });

  return roots;
}

/**
 * ✅ 재귀적으로 댓글 + 자식 댓글(대댓글/대대댓글...)을 렌더링하는 컴포넌트
 *  - depth 에 따라 좌측 인덴트/라인을 넣어서 트리 느낌을 줌
 *  - onReply: "이 댓글에 답글" 눌렀을 때 부모 정보 전달 콜백
 */
function CommentItem({ comment, depth = 0, onReply }) {
  const [collapsed, setCollapsed] = useState(false); // 자식 접기/펼치기
  const hasChildren = comment.children && comment.children.length > 0;

  // 뎁스에 따라 살짝씩 들여쓰기 (최대 64px까지만)
  const indentPx = Math.min(depth * 16, 64);

  return (
    <li className="relative">
      <div
        className="flex flex-col gap-1 py-2 pr-2"
        style={{ marginLeft: indentPx }}
      >
        {/* ✅ depth >= 1 인 경우에만 왼쪽에 세로 라인 표시 (트리 느낌) */}
        {depth > 0 && (
          <div className="absolute left-0 top-0 bottom-0 border-l border-gray-200 pointer-events-none" />
        )}

        {/* 댓글 카드 */}
        <div className="border rounded px-3 py-2 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">
              {comment.writerNickname} ({comment.writerEmail})
            </span>
            <div className="flex items-center gap-2">
              {/* 자식이 있는 경우, 접기/펼치기 토글 버튼 */}
              {hasChildren && (
                <button
                  type="button"
                  className="text-[10px] text-gray-500 hover:underline"
                  onClick={() => setCollapsed((prev) => !prev)}
                >
                  {collapsed ? "펼치기" : "접기"}
                </button>
              )}
              <span className="text-[10px] text-gray-400">
                {new Date(comment.createdAt).toLocaleString("ko-KR")}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-800 whitespace-pre-wrap mb-1">
            {comment.content}
          </p>

          {/* ✅ 어느 뎁스에서든 답글 가능 → 무한 뎁스 지원 */}
          <button
            type="button"
            className="text-[11px] text-blue-500 hover:underline"
            onClick={() =>
              onReply({
                id: comment.id,
                writerNickname: comment.writerNickname,
              })
            }
          >
            ↪️ 답글
          </button>
        </div>

        {/* 자식 댓글들 (대댓글/대대댓글...) */}
        {hasChildren && !collapsed && (
          <ul className="mt-1 space-y-1">
            {comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  // ✅ 댓글 관련 state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [replyTarget, setReplyTarget] = useState(null); // { id, writerNickname }

  // 로컬에 토큰 저장해두는 구조라고 가정 (없으면 댓글 입력 막기)
  const accessToken = localStorage.getItem("accessToken");

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

  // ✅ 댓글 불러오기
  const loadComments = useCallback(async () => {
    try {
      const res = await fetchComments(id);
      setComments(res.data);
    } catch (err) {
      console.error("댓글 불러오기 실패", err);
    }
  }, [id]);

  // 게시글 + 댓글 동시 로딩
  useEffect(() => {
    getPost();
    loadComments();
  }, [getPost, loadComments]);

  const handleDelete = async () => {
    try {
      await deletePostById(post.id);
      setDeleteFlag(false);
      setShowDeletedModal(true);
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  // ✅ 댓글 등록 (일반 댓글 + 대댓글/대대댓글 공통)
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!accessToken) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      nav("/login"); // 실제 로그인 라우트에 맞게 수정
      return;
    }

    try {
      setIsCommentSubmitting(true);
      await createComment(id, {
        content: newComment,
        parentId: replyTarget ? replyTarget.id : null, // ✅ 부모 댓글 id를 parentId로 전달
      });
      setNewComment("");
      setReplyTarget(null); // 답글 모드 해제
      await loadComments(); // 최신 댓글 목록 다시 로딩
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  // ✅ 트리 구조로 변환된 댓글 (useMemo로 캐싱)
  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);

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
          <p className="text-gray-800 whitespace-pre-wrap mb-6">
            {post.content}
          </p>

          {/* ✅ 댓글 섹션 */}
          <section className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3">💬 댓글</h2>

            {/* 현재 답글 대상 표시 */}
            {replyTarget && (
              <div className="mb-2 text-xs text-blue-600 flex items-center gap-2">
                <span>
                  ↪️ <b>{replyTarget.writerNickname}</b> 님께 답글 다는 중
                </span>
                <button
                  type="button"
                  className="text-[11px] text-gray-500 underline"
                  onClick={() => setReplyTarget(null)}
                >
                  취소
                </button>
              </div>
            )}

            {/* 댓글 입력 */}
            {accessToken ? (
              <form
                onSubmit={handleAddComment}
                className="flex gap-2 mb-4 items-center"
              >
                <input
                  type="text"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder={
                    replyTarget
                      ? `${replyTarget.writerNickname} 님께 답글을 입력하세요`
                      : "댓글을 입력하세요"
                  }
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isCommentSubmitting}
                  className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {isCommentSubmitting ? "등록 중..." : "등록"}
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-500 mb-3">
                댓글을 작성하려면 로그인이 필요합니다.
              </p>
            )}

            {/* ✅ 댓글 트리 렌더링 */}
            <ul className="space-y-1">
              {comments.length === 0 && (
                <li className="text-xs text-gray-500">아직 댓글이 없습니다.</li>
              )}

              {commentTree.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  depth={0}
                  onReply={setReplyTarget} // 어떤 댓글이든 답글 타겟으로 지정
                />
              ))}
            </ul>
          </section>
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
          onClose={() => nav(-1)}
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

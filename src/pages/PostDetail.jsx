import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getPostById, deletePostById } from "../api/post";
import { fetchComments, createComment, deleteComment } from "../api/comment";
import { useUser } from "../context/AppContext";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

/**
 * buildCommentTree: flat한 댓글 배열을 계층 구조(트리)로 변환
 * 
 * - 백엔드에서 받은 댓글 배열은 flat 구조 (parentId로 부모-자식 관계 표현)
 * - 이 함수는 parentId를 기준으로 트리 구조로 재구성
 * 
 * @param {Array} comments - flat 구조의 댓글 배열
 * @returns {Array} 루트 댓글 배열 (children 속성에 대댓글 포함)
 * 
 * 예시:
 * 입력: [
 *   { id: 1, parentId: null, content: "댓글1" },
 *   { id: 2, parentId: 1, content: "대댓글1-1" },
 *   { id: 3, parentId: null, content: "댓글2" }
 * ]
 * 
 * 출력: [
 *   { id: 1, parentId: null, content: "댓글1", children: [
 *     { id: 2, parentId: 1, content: "대댓글1-1", children: [] }
 *   ]},
 *   { id: 3, parentId: null, content: "댓글2", children: [] }
 * ]
 */
function buildCommentTree(comments) {
  const map = new Map();
  const roots = [];

  // 1단계: 모든 댓글을 Map에 저장하고 children 배열 초기화
  comments.forEach((c) => {
    map.set(c.id, { ...c, children: [] });
  });

  // 2단계: parentId를 기준으로 부모-자식 관계 구성
  map.forEach((node) => {
    if (node.parentId == null) {
      // parentId가 null이면 루트 댓글
      roots.push(node);
    } else {
      // parentId가 있으면 해당 부모의 children에 추가
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // 부모를 찾지 못하면 안전하게 루트로 처리
        // (데이터 정합성 문제 대비)
        roots.push(node);
      }
    }
  });

  return roots;
}

/**
 * 상대 시간 계산 함수 ("방금 전", "5분 전", "2시간 전" 등)
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 상대 시간 표현
 */
function getRelativeTime(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return past.toLocaleDateString("ko-KR");
}

/**
 * CommentItem: 댓글 렌더링 컴포넌트 (재귀적으로 대댓글 표시)
 * 
 * UI 개선:
 * - 대댓글 왼쪽은 들여쓰기, 오른쪽 끝은 첫 댓글과 정렬
 * - depth > 0인 경우 "@답글대상" 표시
 * - 상대 시간 표시 ("5분 전", "2시간 전" 등)
 * - 접기/펼치기 기능 (자식 댓글이 있는 경우)
 * - 답글 버튼 (무한 뎁스 지원)
 * - 삭제된 댓글 처리 (deleted === true)
 * 
 * @param {Object} comment - 댓글 객체 (children 배열 포함, deleted 필드 포함)
 * @param {number} depth - 현재 뎁스 (0부터 시작, 루트 댓글 = 0)
 * @param {Function} onReply - 답글 버튼 클릭 시 실행될 콜백
 * @param {Function} onDelete - 댓글 삭제 콜백
 * @param {string} parentNickname - 부모 댓글 작성자 닉네임 (답글 대상 표시용)
 * @param {Object} currentUser - 현재 로그인한 사용자 정보
 */
function CommentItem({ comment, depth = 0, onReply, onDelete, parentNickname = null, currentUser = null }) {
  const [collapsed, setCollapsed] = useState(false); // 자식 댓글 접기/펼치기 상태
  const hasChildren = comment.children && comment.children.length > 0;
  const isDeleted = comment.deleted; // 삭제된 댓글 여부
  const isOwner = currentUser && comment.writerEmail === currentUser.email; // 본인 댓글 여부

  // 들여쓰기는 최대 1단계만 (16px)
  const indentPx = depth > 0 ? 16 : 0;

  return (
    <li>
      <div className="flex flex-col gap-1 py-2" style={{ paddingLeft: indentPx }}>
        {/* 댓글 카드 */}
        <div className={`border rounded px-3 py-2 shadow-sm ${
          isDeleted ? "bg-gray-100" : "bg-white"
        }`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold ${
                isDeleted ? "text-gray-400" : ""
              }`}>
                {isDeleted ? "알 수 없음" : comment.writerNickname}
              </span>
              {/* depth > 0이면 답글 대상 표시 */}
              {!isDeleted && depth > 0 && parentNickname && (
                <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  → @{parentNickname}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">
                {getRelativeTime(comment.createdAt)}
              </span>
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
            </div>
          </div>

          {/* 댓글 내용 또는 삭제 메시지 */}
          <p className={`text-sm whitespace-pre-wrap mb-1 ${
            isDeleted ? "text-gray-400 italic" : "text-gray-800"
          }`}>
            {isDeleted ? "삭제 처리된 댓글입니다." : comment.content}
          </p>

          {/* 답글 버튼 (삭제된 댓글은 비활성화) */}
          <div className="flex items-center gap-2">
            {!isDeleted && (
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
            )}
            {/* 삭제 버튼 (본인 댓글이고, 삭제되지 않은 경우만) */}
            {!isDeleted && isOwner && (
              <button
                type="button"
                className="text-[11px] text-red-500 hover:underline"
                onClick={() => onDelete(comment.id)}
              >
                🗑️ 삭제
              </button>
            )}
          </div>
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
                onDelete={onDelete}
                parentNickname={comment.writerNickname} // 부모 닉네임 전달
                currentUser={currentUser}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * PostDetail: 게시글 상세 페이지
 * 
 * 주요 기능:
 * 1. 게시글 상세 정보 표시 (제목, 내용, 작성자, 작성일)
 * 2. 게시글 수정/삭제 (작성자만 가능 - 백엔드에서 검증)
 * 3. 계층형 댓글 시스템 (무한 뎁스 지원)
 *    - 일반 댓글 작성
 *    - 대댓글, 대대댓글 작성 (parentId 사용)
 *    - 댓글 트리 구조 렌더링
 *    - 접기/펼치기 기능
 */
export default function PostDetail() {
  const { id } = useParams(); // URL 파라미터에서 게시글 ID 추출
  const nav = useNavigate();
  const { user } = useUser(); // 현재 로그인한 사용자 정보

  // 게시글 관련 state
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false); // 에러 모달
  const [deleteFlag, setDeleteFlag] = useState(false); // 삭제 확인 모달
  const [showDeletedModal, setShowDeletedModal] = useState(false); // 삭제 완료 모달

  // 댓글 관련 state
  const [comments, setComments] = useState([]); // flat 구조의 댓글 배열
  const [newComment, setNewComment] = useState(""); // 입력 중인 댓글 내용
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false); // 댓글 제출 중 상태
  const [replyTarget, setReplyTarget] = useState(null); // 답글 대상 { id, writerNickname }
  const [deleteCommentId, setDeleteCommentId] = useState(null); // 삭제 확인 모달용 댓글 ID

  // 로그인 여부 확인 (댓글 작성 권한)
  const accessToken = localStorage.getItem("accessToken");

  /**
   * getPost: 게시글 상세 정보 불러오기
   */
  const getPost = useCallback(async () => {
    try {
      const res = await getPostById(id);
      setPost(res.data);
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      setShowModal(true);
    }
  }, [id]);

  /**
   * loadComments: 댓글 목록 불러오기
   */
  const loadComments = useCallback(async () => {
    try {
      const res = await fetchComments(id);
      setComments(res.data);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  }, [id]);

  // 컴포넌트 마운트 시 게시글 + 댓글 동시 로딩
  useEffect(() => {
    getPost();
    loadComments();
  }, [getPost, loadComments]);

  /**
   * handleDelete: 게시글 삭제 처리
   */
  const handleDelete = async () => {
    try {
      await deletePostById(post.id);
      setDeleteFlag(false);
      setShowDeletedModal(true);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  /**
   * handleAddComment: 댓글/대댓글 작성 처리
   * - replyTarget이 null이면 일반 댓글 (parentId: null)
   * - replyTarget이 있으면 대댓글 (parentId: replyTarget.id)
   */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // 로그인 확인
    if (!accessToken) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      nav("/login");
      return;
    }

    try {
      setIsCommentSubmitting(true);
      
      // 댓글 작성 API 호출
      await createComment(id, {
        content: newComment,
        parentId: replyTarget ? replyTarget.id : null, // 답글 대상의 ID
      });
      
      // 입력 필드 초기화
      setNewComment("");
      setReplyTarget(null); // 답글 모드 해제
      
      // 최신 댓글 목록 다시 로딩
      await loadComments();
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  /**
   * handleDeleteComment: 댓글 삭제 처리 (soft delete)
   * - 실제로 삭제하지 않고 deleted 필드를 true로 변경
   */
  const handleDeleteComment = async () => {
    if (!deleteCommentId) return;

    try {
      await deleteComment(id, deleteCommentId);
      setDeleteCommentId(null); // 모달 닫기
      await loadComments(); // 최신 댓글 목록 다시 로딩
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  /**
   * commentTree: flat 댓글 배열을 트리 구조로 변환
   * - useMemo로 캐싱 (comments가 변경될 때만 재계산)
   */
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
                  onDelete={setDeleteCommentId} // 삭제 버튼 클릭 시 확인 모달 표시
                  currentUser={user} // 현재 사용자 정보 전달
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

      {/* 댓글 삭제 확인 모달 */}
      {deleteCommentId && (
        <ConfirmModal
          title="댓글을 삭제하시겠어요?"
          message="삭제된 댓글은 '삭제 처리된 댓글입니다.'로 표시됩니다."
          confirmLabel="삭제하기"
          cancelLabel="취소"
          onConfirm={handleDeleteComment}
          onCancel={() => setDeleteCommentId(null)}
        />
      )}
    </div>
  );
}

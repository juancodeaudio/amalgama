import { Tables, CommentWithReplies } from "../_types/supabase";

const sortNestedComments = ( nestedComments: CommentWithReplies[] ) => {
  nestedComments.forEach((comment) => {
    if (comment.replies) {
      comment.replies = comment.replies.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
    }
  });
}

export const buildCommentsTree = (comments: Tables<'comments'>[]): CommentWithReplies[] => {
  const commentsMap: { [id: string]: CommentWithReplies } = {};
  const nestedComments: CommentWithReplies[] = [];

  comments.forEach((comment) => {
    commentsMap[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.reply_of) {
      const parentComment = commentsMap[comment.reply_of];
      if (parentComment) {
        parentComment.replies = [...(parentComment.replies || []), commentsMap[comment.id]];
      }
    } else {
      nestedComments.push(commentsMap[comment.id]);
    }
  });

  sortNestedComments(nestedComments);

  return nestedComments;
};
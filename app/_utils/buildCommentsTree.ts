import { Tables, CommentWithReplies } from "../_types/supabase";

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

  return nestedComments;
};
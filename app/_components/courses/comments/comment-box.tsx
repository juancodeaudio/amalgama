'use client'

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { getUserInfo } from "@/utils/getUserInfo";
import type { User as UserTypes } from "@clerk/nextjs/dist/types/server";

import CommentboxOptions from "@/app/_components/courses/comments/commentbox-options";
import CommentsForm from "@/app/_components/courses/comments/comments-form";
import DeleteComment from "@/app/_components/courses/comments/delete-comment";

import { stringifyDate } from "@/utils/stringifyDate";
import { CommentWithReplies } from "@/types/supabase";

import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { User} from "@nextui-org/user";
import { useDisclosure } from '@nextui-org/modal'

import { HiArrowUturnLeft } from "react-icons/hi2";

type CommentType = {
  comment: CommentWithReplies,
  users: UserTypes[],
  commentsData: CommentWithReplies[],
  setCommentsData: (value: any) => void,
  isDeletable?: boolean,
  replyOf: string | null,
  setReplyOf: (value: string | null) => void,
  isReply?: boolean
}

const CommentBox = ({ comment, users, commentsData, setCommentsData, isDeletable, replyOf, setReplyOf, isReply}: CommentType) => {
  
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const { getToken } = useAuth();

  const confirmDelete = async (id: string | undefined, replyOf: string | null) => {
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      }
    )
    onClose();
    const { error } = await supabase.from("comments").delete().match({ id });
    
    if (!error) {
      if (isReply) {
        const parentCommentIndex = commentsData.findIndex((comment) => comment.id === replyOf);
        const parentCommentReplies = commentsData[parentCommentIndex].replies;
        if(parentCommentReplies) {
          const replyIndex = parentCommentReplies.findIndex((reply) => reply.id === id);
          parentCommentReplies.splice(replyIndex, 1);
          setCommentsData((prev: CommentWithReplies[]) => prev.map((comment: CommentWithReplies) => (
            comment.id === replyOf
              ? { ...comment, replies: parentCommentReplies }
              : comment
            )
          ));
        };
      } else {
        setCommentsData((prev: CommentWithReplies[]) => prev.filter((comment: CommentWithReplies) => comment.id !== id));
      }
    } else {
      throw error;
    }
  };
  const deleteComment = async (id: string | undefined, replyOf: string | null) => {
    toast.promise(confirmDelete(id, replyOf), {
      loading: 'Eliminando...',
      success: 'Se eliminó el comentario',
      error: 'Error eliminando el comentario',
    });
  }

  return (
    <article className={`p-6 text-base ${isReply ? 'pr-0 border-t border-t-foreground/20' : 'border-b border-b-foreground/20 mb-4 py-2'}`}>
      <div className="flex justify-between items-center mb-2">
        <User
          name={getUserInfo(users, comment.user_id).name}
          description={stringifyDate(comment.created_at)}
          avatarProps={{
            size: "sm",
            src: getUserInfo(users, comment.user_id).image,
            name: '',
            showFallback: true,
          }}
          classNames={{
            description: "text-foreground/40 text-tiny",
          }}
        />
        {
          isDeletable &&
          <>
            <CommentboxOptions onOpen={onOpen} />
            <DeleteComment isOpen={isOpen} onOpenChange={onOpenChange} onDelete={() => deleteComment(comment.id, comment.reply_of)} />
          </>
        }
      </div>
      <p className="text-foreground/70">{comment.content}</p>
      {
        !isReply &&
        <div className="flex items-center mt-1 mb-2 ml-12">
          <Button
            variant="light"
            type="button"
            size="sm"
            onPress={() => setReplyOf(comment.id || null)}
            startContent={<HiArrowUturnLeft />}
            className={`${replyOf === comment.id && 'hidden'} text-tiny hover:text-secondary`}
          >
            Responder
          </Button>
          <CommentsForm
            authorName={getUserInfo(users, comment.user_id).firstName}
            replyOf={replyOf}
            setReplyOf={setReplyOf}
            classId={comment.class_id}
            setCommentsData={setCommentsData}
            commentsData={commentsData}
            isReplyForm
            isHidden={replyOf !== comment.id}
          />
        </div>
      }
      <div className="grid grid-cols-12 grid-rows-1 gap-0">
        { 
          ((!isReply && comment.replies) && (comment.replies.length > 0)) && 
          <div className="pb-[75px]">
            <div className="ml-4 h-full w-4 rounded-bl-lg border-l-large border-b-large opacity-10"></div>
          </div>
        }
        <div className="col-span-11">
          {
            comment.replies &&
            comment.replies.map((reply, index) => (
              <CommentBox
                key={index}
                users={users}
                comment={reply}
                commentsData={commentsData}
                setCommentsData={setCommentsData}
                isDeletable={isDeletable}
                replyOf={replyOf}
                setReplyOf={setReplyOf}
                isReply
              />
            ))
          }
        </div>
      </div>
    </article>
  )
}

export default CommentBox
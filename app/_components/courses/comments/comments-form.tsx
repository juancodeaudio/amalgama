'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js';

import { CommentWithReplies } from '@/types/supabase'

import { Button } from '@nextui-org/button'
import {Textarea} from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";

import { HiArrowUturnLeft, HiPaperAirplane } from "react-icons/hi2"

type ClassCommentsProps = {
  authorName?: string,
  classId: string,
  commentsData: CommentWithReplies[] | null,
  setCommentsData: (value: CommentWithReplies[]) => void,
  replyOf: string | null,
  setReplyOf: (value: string | null) => void
  isReplyForm?: boolean
  isHidden?: boolean
}

const CommentsForm = ({ authorName, classId, commentsData, setCommentsData, replyOf, setReplyOf, isReplyForm, isHidden }: ClassCommentsProps) => {
  const [newComment, setNewComment] = useState<string>("");
  const { getToken, userId } = useAuth();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commentValue = event.target.value;
    setNewComment(commentValue);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment === "") {
      return;
    }
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      }
    );

    const { data } = await supabase
      .from("comments")
      .insert({ content: newComment, user_id: userId, class_id: classId })
      .select()

    if (data != null && commentsData != null) {
      setCommentsData([...commentsData, data[0]]);
    }
    setNewComment("");
    setReplyOf(null);
  };

  const handleReplySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment === "") {
      return;
    }
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      }
    );
    
    const { data } = await supabase
      .from("comments")
      .insert({ content: newComment, user_id: userId, class_id: classId, reply_of: replyOf })
      .select()

    if (data != null && commentsData != null) {
      const parentCommentIndex = commentsData.findIndex(comment => comment.id === replyOf);
      if (parentCommentIndex !== -1) {
        const parentComment = commentsData[parentCommentIndex];
        let newReplies = [];
        if (parentComment.replies !== null && parentComment.replies !== undefined) {
          newReplies = [...parentComment.replies, data[0]];
        } else {
          newReplies = [data[0]]
        }
        const newParentComment = { ...parentComment, replies: newReplies };
        const newCommentsData = [...commentsData];
        newCommentsData[parentCommentIndex] = newParentComment;
        setCommentsData(newCommentsData);
      }
    }
    setNewComment("");
    setReplyOf(null);
  };

  return (
    <form
      onSubmit={!isReplyForm ? handleCommentSubmit: handleReplySubmit}
      className={`mb-6 ${isHidden ? 'hidden' : ''} ${isReplyForm ? 'w-4/5' : ''}`}
    >
      {
        (replyOf && isReplyForm) && (
        <Chip
          color='secondary'
          variant='flat'
          startContent={<HiArrowUturnLeft />}
          onClose={() => setReplyOf(null)}
          className='italic mt-1 mb-2'
        >
          {authorName}
        </Chip>
      )}
      <div className={`flex gap-3 ${isReplyForm? 'items-center' : 'flex-col'}`}>
        <Textarea 
          value={newComment}
          onChange={onChange}
          variant='faded'
          placeholder="Escribe tu comentario..."
          required
        />
        <div>
          <Button
            type="submit"
            color='secondary'
            className='text-background'
            endContent={<HiPaperAirplane />}
            isIconOnly={isReplyForm}
          >
            {isReplyForm? '' : 'Enviar'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CommentsForm
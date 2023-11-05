'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@nextui-org/button'
import { HiPaperAirplane } from 'react-icons/hi2'
import { Tables, CommentWithReplies } from '@/app/_types/supabase'
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js';
import {Textarea} from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";
import { HiArrowUturnLeft } from "react-icons/hi2"

type ClassCommentsProps = {
  classId: string,
  commentsData: CommentWithReplies[] | null,
  setCommentsData: (value: CommentWithReplies[]) => void,
  replyOf: string | null,
  setReplyOf: (value: string | null) => void
}

const CommentsForm = ({ classId, commentsData, setCommentsData, replyOf, setReplyOf }: ClassCommentsProps) => {
  const [newComment, setNewComment] = useState<string>("");
  const { getToken, userId } = useAuth();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commentValue = event.target.value;
    setNewComment(commentValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      setCommentsData([...commentsData, data[0]]);
    }
    setNewComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6"
    >
      {replyOf && (
        <Chip
          color='secondary'
          variant='flat'
          startContent={<HiArrowUturnLeft />}
          onClose={() => setReplyOf(null)}
          className='italic mt-1 mb-2'
        >
          {replyOf}
        </Chip>
      )}
      <Textarea 
        value={newComment}
        onChange={onChange}
        variant='faded'
        placeholder="Escribe tu comentario..."
        required
      />
      <Button
        type="submit"
        color='secondary'
        className='text-background mt-3'
        endContent={<HiPaperAirplane />}
      >
        Enviar
      </Button>
    </form>
  )
}

export default CommentsForm
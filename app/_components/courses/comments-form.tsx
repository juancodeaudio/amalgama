'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@nextui-org/button'
import { createBrowserClient } from '@supabase/ssr'
import { HiPaperAirplane } from 'react-icons/hi2'
import { Tables } from '@/app/_types/supabase'
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js';

type ClassCommentsProps = {
  classId: string,
  commentsData: Tables<'comments'>[] | null,
  setCommentsData: (value: Tables<'comments'>[]) => void
}

const CommentsForm = ({ classId, commentsData, setCommentsData }: ClassCommentsProps) => {
  const [newComment, setNewComment] = useState<string>("");
  const { getToken, userId } = useAuth();

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    console.log(commentValue);
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
      .insert({ content: newComment, user_id: userId, class_id: classId })
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
      <div className="py-2 px-4 mb-4 bg-foreground/10 rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <textarea
          id="comment"
          value={newComment}
          onChange={onChange}
          rows={6}
          className="px-0 w-full text-sm text-foreground border-0 focus:ring-0 focus:outline-none dark:placeholder-foreground/60 bg-transparent"
          placeholder="Write a comment..."
          required
        />
      </div>
      <Button
        type="submit"
        color='secondary'
        className='text-background'
        endContent={<HiPaperAirplane />}
      >
        Enviar
      </Button>
    </form>
  )
}

export default CommentsForm
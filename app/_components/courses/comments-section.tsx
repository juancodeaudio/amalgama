'use client'

import { useState, useEffect } from "react";
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import { title } from "../primitives"
import CommentsForm from "./comments-form"
import CommentBox from "./comment-box"
import { Card, CardBody } from "@nextui-org/card"
import { DbResult, CommentWithReplies } from "@/app/_types/supabase";
import { createBrowserClient } from '@supabase/ssr';
import { getUsers } from '@/app/actions'
import type { User } from "@clerk/nextjs/dist/types/server";
import { buildCommentsTree } from "@/app/_utils/buildCommentsTree";
import { useAuth } from '@clerk/nextjs'
import { Toaster } from "sonner";


const CommentsSection = () => {
  const [commentsData, setCommentsData] = useState<CommentWithReplies[] | null>(null)
  const [replyOf, setReplyOf] = useState<string | null>(null);
  const [usersData, setUsersData] = useState<User[]>([])
  const [classID, setClassID] = useState<string>("")
  const { userId } = useAuth();
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class")
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  useEffect(() => {
    const getCommentsData = async () => {
      const query = supabase.from('classes').select(`
        *,
        comments (*)
      `).eq('slug', selectedClass)
      const { data: classInfo }: DbResult<typeof query> = await query
      const users = await getUsers()
      if(classInfo) {
        const commentsTree = buildCommentsTree(classInfo[0].comments)
        setCommentsData(commentsTree)
        setClassID(classInfo[0].id)
      }
      setUsersData(users)
    }
    getCommentsData()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass])
  console.log(commentsData)

  return (
    <Card className="w-full bg-background">
      <CardBody className="py-8 lg:py-16">    
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className={clsx(title({ size:'sm'}), 'text-foreground')}>Comentarios ({commentsData?.length})</h2>
          </div>
          <CommentsForm classId={classID} commentsData={commentsData} setCommentsData={setCommentsData} replyOf={replyOf} setReplyOf={setReplyOf}/>
          { 
            (commentsData) && 
            commentsData.length > 0
            ? commentsData?.sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              return +bDate - +aDate;
            }).map((comment, index) => (
              <CommentBox
                key={index}
                users={usersData}
                comment={comment}
                commentsData={commentsData}
                setCommentsData={setCommentsData}
                isDeletable={comment.user_id === userId}
                replyOf={replyOf}
                setReplyOf={setReplyOf}
                isReply={false}
              />
            ))
            : <div className="text-center">
              <p className="text-foreground/70 text-xl">Parece que no hay comentarios aún...</p>
            </div>
          }
        </div>
        <Toaster
          position="bottom-right"
          // theme="dark"
          toastOptions={{
            style: { background: '#f5f5f5', border: 'none' },
          }}
          richColors
        />
      </CardBody>
    </Card>
  )
}

export default CommentsSection
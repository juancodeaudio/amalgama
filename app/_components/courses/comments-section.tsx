'use client'

import { useState, useEffect } from "react";
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import { title } from "../primitives"
import CommentsForm from "./comments-form"
import CommentBox from "./comment-box"
import { Card, CardBody } from "@nextui-org/card"
import { Tables, DbResult } from "@/app/_types/supabase";
import { createBrowserClient } from '@supabase/ssr';
import { getUsers } from '@/app/actions'
import type { User } from "@clerk/nextjs/dist/types/server";
import { stringifyDate } from "@/app/_utils/stringifyDate";


const CommentsSection = () => {
  const [commentsData, setCommentsData] = useState<Tables<'comments'>[] | null>(null)
  const [usersData, setUsersData] = useState<User[]>([])
  const [classID, setClassID] = useState<string>("")
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class")
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const getUserName = (users: User[], userId: string) => {
    const user = users.find(user => user.id === userId)
    if(user?.firstName === undefined || user?.lastName === undefined) {
      return 'Usuario'
    }
    return `${user?.firstName} ${user?.lastName}`
  }
  const getUserImage = (users: User[], userId: string) => {
    const user = users.find(user => user.id === userId)
    return `${user?.imageUrl}`
  }
  useEffect(() => {
    const getCommentsData = async () => {
      const query = supabase.from('classes').select(`
        *,
        comments (*)
      `).eq('slug', selectedClass)
      const { data: classInfo }: DbResult<typeof query> = await query
      const users = await getUsers()
      if(classInfo) {
        setCommentsData(classInfo[0].comments)
        setClassID(classInfo[0].id)
        getUserName(users, classInfo[0].comments[0].user_id)
      }
      setUsersData(users)
    }
    getCommentsData()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass])
  console.log('CommentsData: ', commentsData)
  console.log('UsersData: ', usersData)

  return (
    <Card className="w-full bg-background">
      <CardBody className="py-8 lg:py-16">    
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className={clsx(title({ size:'sm'}), 'text-foreground')}>Comentarios ({commentsData?.length})</h2>
          </div>
          <CommentsForm classId={classID} commentsData={commentsData} setCommentsData={setCommentsData}/>
          { 
            (commentsData?.length) && 
            commentsData.length > 0
            ? commentsData?.sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              return +bDate - +aDate;
            }).map((comment, index) => (
              <CommentBox
                key={index}
                setCommentsData={setCommentsData}
                commentId={comment.id}
                authorName={getUserName(usersData, comment.user_id)}
                authorImage={getUserImage(usersData, comment.user_id)}
                date={stringifyDate(comment.created_at)}
                content={comment.content}
                isDeletable={comment.user_id === comment.user_id}
              />
            ))
            : <div className="text-center">
              <p className="text-foreground/70 text-xl">Parece que no hay comentarios aún...</p>
            </div>
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default CommentsSection
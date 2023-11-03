'use client'

import { useState, useEffect } from "react";
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import { title } from "../primitives"
import CommentsForm from "./comments-form"
import CommentBox from "./comment-box"
import { Card, CardBody } from "@nextui-org/card"
import { siteContent } from "@/app/_config/content";
import { Tables, DbResult } from "@/app/_types/supabase";
import { createBrowserClient } from '@supabase/ssr';

const CommentsSection = () => {
  const [commentsData, setCommentsData] = useState<Tables<'comments'>[] | null>(null)
  const [classID, setClassID] = useState<string>("")
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
      classInfo && setCommentsData(classInfo[0].comments)
      classInfo && setClassID(classInfo[0].id)
    }
    getCommentsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass])

  const stringifyDate = (date: string) => {
    const timeStamp = Date.parse(date)
    const localeDate = new Date(timeStamp).toLocaleDateString(
      'es-CO', 
      { year: 'numeric', month: 'short', day: 'numeric' }
    )
    return localeDate
  }

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
            ? commentsData?.map((comment, index) => (
              <CommentBox
                key={index}
                authorName={comment.user_id}
                authorImage='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                date={stringifyDate(comment.created_at)}
                content={comment.content}
              />
            ))
            : <div className="text-center">
              <p className="text-foreground/70 text-xl">Parece que no hay comentarios aún...</p>
            </div>
          }
          {/* {
            siteContent.comments.map((comment, index) => (
              <CommentBox
                key={index}
                authorName={comment.authorName}
                authorImage={comment.authorImage}
                date={comment.date}
                content={comment.content}
              />
            )
            )
          } */}
        </div>
      </CardBody>
    </Card>
  )
}

export default CommentsSection
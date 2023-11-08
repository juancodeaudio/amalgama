'use client'

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { createBrowserClient } from '@supabase/ssr';
import Link from "next/link";

import { title } from "@/components/primitives";
import Confetti from '@/components/courses/confetti';
import CourseFeedback from "@/components/courses/course-feedback";

import { CoursesWithFeedbacks, DbResult } from "@/types/supabase";

import { Toaster } from "sonner";
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card'
import { Button } from "@nextui-org/button";
import { Image } from '@nextui-org/image';

import { HiHome, HiQueueList } from "react-icons/hi2";

const Congratulations = ({ params }: { params: { slug: string } }) => {
  const [courseInfo, setCourseInfo] = useState<CoursesWithFeedbacks | null>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const getCourseData = async () => {
    const query = supabase.from('courses').select(`
      *,
      feedbacks (*)
    `).eq('slug', params.slug)
    const { data: courses }: DbResult<typeof query> = await query
    courses && setCourseInfo(courses[0])
  }
  useEffect(() => {
    getCourseData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="w-screen h-[90vh] px-10 flex items-center justify-center">
      <Card className="py-4 flex flex-col items-center w-2/3 h-[95%]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h1 className={clsx(title({ size: "lg"}), 'text-primary')}>¡Felicidades!</h1>
        </CardHeader>
        <CardBody className="py-6 flex-col justify-between">
          <div className="flex flex-row justify-evenly">
            <div className="flex justify-center items-center">
              <Image
                src="/trophy.svg"
                alt={courseInfo?.title}
                width={250}
                height={250}
              />
            </div>
            <div className="h-full flex flex-col py-12 justify-between">
              <p className="text-foreground/70">Has completado el curso</p>
              <div className="flex-col items-center">
                <h2 className={clsx(title({ size: "sm"}), 'uppercase font-bold')}>{courseInfo?.title}</h2>
                <p className="text-3xl">{courseInfo?.description}</p>
              </div>
              <p className="text-foreground/70">¡Este es solo el comienzo de tu camino!</p>
            </div>
          </div>
          <div className="flex flex-row mx-auto gap-6 items-end">
            <Button
              variant="bordered"
              startContent={<HiHome className="text-lg" />}
              isIconOnly
              as={Link}
              href="/"
            />
            <Button
              as={Link}
              href="/courses"
              endContent={<HiQueueList className="text-lg" />}
            >
              Explora más cursos
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          {
            courseInfo &&
            <CourseFeedback courseData={courseInfo} />
          }
        </CardFooter>
      </Card>
      <Toaster
          position="bottom-right"
          // theme="dark"
          toastOptions={{
            style: { background: '#f5f5f5', border: 'none' },
          }}
          richColors
        />
      <Confetti />
    </main>
  )
}

export default Congratulations
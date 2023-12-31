'use client'

import { useState, useEffect } from "react";

import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/nextjs'
import Link from "next/link";

import { title } from "@/components/primitives";
import { CoursesWithClasses } from "@/types/supabase";

import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Button } from "@nextui-org/button";

import { HiHeart, HiArrowRight } from "react-icons/hi2";

type CourseCardProps = {
  likedCourses: string[] | undefined,
  courseData:CoursesWithClasses,
}

const CourseCard = ({ likedCourses, courseData }: CourseCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { getToken, userId } = useAuth();
  useEffect(() => {
    if(likedCourses) {
      setIsLiked(likedCourses.includes(courseData.id))
    }
  }, [likedCourses, courseData.id])

  const handleLike = async () => {
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
    if(isLiked) {
      const { error } = await supabase.from('likes').delete().eq('course_id', courseData.id);
      if(error) {
        console.log(error)
      }
      setIsLiked(false)
    } else {
      const { error } = await supabase.from('likes').insert({ user_id: userId, course_id: courseData.id });
      if(error) {
        console.log(error)
      }
      setIsLiked(true)
    }
  }
  return (
    <Card 
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-6 sm:gap-4 items-center justify-center lg:grid-cols-6 lg:gap-6">
          <div className="relative col-span-6 sm:col-span-4 lg:col-span-6">
            <Image
              alt="Imagen del curso"
              className="object-cover"
              height={200}
              shadow="md"
              src={courseData.image}
              width="100%"
            />
          </div>
          <div className="flex flex-col col-span-6 sm:col-span-8 lg:col-span-6">
            <h2 className={title({ size: 'sm'})}>{courseData.title}</h2>
            <p className="opacity-70">{courseData.description}</p>
            <div className="flex mt-5">
              <div>
                <p className="text-tiny opacity-70">{`${courseData.classes.length} Lecciones`}</p>
                <p className="text-tiny opacity-70">{`${courseData.duration} horas`}</p>
              </div>
              <Button
                onPress={handleLike}
                className={` ${isLiked ? 'text-primary' : 'text-foreground'} border-default-200 ml-auto`}
                color={ isLiked ? "primary" : "default" }
                radius="full"
                size="sm"
                variant="flat"
                startContent={<HiHeart className="h-5 w-5" />}
                isIconOnly
              />
              <Link href={`/courses/${courseData.slug}?class=${courseData.classes[0].slug}`}>
                <Button
                  className="text-tiny ml-4 w-16"
                  color="primary"
                  radius="full"
                  size="sm"
                  startContent={<HiArrowRight className="h-5 w-5" />}
                  isIconOnly
                />
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CourseCard
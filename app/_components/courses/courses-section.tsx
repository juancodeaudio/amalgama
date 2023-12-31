import clsx from "clsx"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { auth } from '@clerk/nextjs';

import CourseCard from "@/components/courses/course-card";

import { title } from "@/components/primitives"

const CoursesSection = async () => {
  const { userId } : { userId: string | null } = auth();
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data: courses } = await supabase.from('courses').select('*, classes(*)');
  const { data: likes } = await supabase.from('likes').select('*').eq('user_id', userId);
  const likedCourses = likes?.map((like) => like.course_id);
  return (
    <section className="flex flex-col w-full py-12 gap-10 items-center">
      <h1 className={clsx(title({ size: 'lg' }), 'text-primary')}>Cursos</h1>
      <div className="w-screen h-5/6 flex flex-col lg:flex-row gap-8 md:gap-10 xl:gap-20 py-5 px-10 xl:px-40 overflow-x-scroll">
        { courses && 
          courses.map((course) => (
            <CourseCard
              likedCourses={likedCourses}
              courseData={course}
              key={course.slug}
            />
          ))
        }
      </div>
    </section>
  )
}

export default CoursesSection
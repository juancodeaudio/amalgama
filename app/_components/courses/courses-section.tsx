
import clsx from "clsx"
import { title } from "../primitives"
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import CourseCard from "./course-card";

const CoursesSection = async () => {
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
  return (
    <section className="flex flex-col w-full py-12 gap-10 items-center">
      <h1 className={clsx(title({ size: 'lg' }), 'text-primary')}>Cursos</h1>
      <div className="w-screen h-5/6 flex flex-col lg:flex-row gap-8 md:gap-10 xl:gap-20 py-5 px-10 xl:px-40 overflow-x-scroll">
        { courses && 
          courses.map((course) => (
            <CourseCard
              key={course.slug}
              courseTitle={course.title}
              description={course.description}
              courseImage={course.image}
              href={`/courses/${course.slug}?class=${course.classes[0].slug}`}
            />
          ))
        }
      </div>
    </section>
  )
}

export default CoursesSection
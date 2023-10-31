'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
import { motion as m } from "framer-motion";
import CourseNav from "@/app/_components/courses/course-nav";
import CommentsSection from "@/app/_components/courses/comments-section";
import ClassContent from "@/app/_components/courses/class-content";
import { createBrowserClient } from '@supabase/ssr';
import { CoursesWithClasses, DbResult } from "@/app/_types/supabase";

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const [tableIsActive, setTableIsActive] = useState(false)
  const [courseInfo, setCourseInfo] = useState<CoursesWithClasses | null>(null)
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class")
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const getCoursesData = async () => {
    const query = supabase.from('courses').select(`
      *,
      classes (*)
    `).eq('slug', params.slug)
    const { data: courses }: DbResult<typeof query> = await query
    courses && setCourseInfo(courses[0])
  }
  useEffect(() => {
    getCoursesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const selectedClassData = courseInfo?.classes.find(classi => classi.slug === selectedClass)

  const prevClass = () => {
    
  }
  const nextClass = () => {

  }

	return (
		<main className='flex relative px-10 gap-10 bg-secondary -mt-16 pb-20'>
      <m.aside className={`w-5/6 md:w-2/3 z-[900] h-screen top-0 left-0 ${tableIsActive? 'fixed lg:hidden': 'hidden'}`}>
        <div className="absolute h-screen w-screen bg-background/50 backdrop-blur left-0 -z-[900]"></div>
        {
          (!!courseInfo && !!selectedClass) &&
          <CourseNav courseData={courseInfo} selectedClass={selectedClass} />
        }  
      </m.aside>
      <m.aside className="hidden lg:flex w-1/4 h-[75vh] sticky top-[15%]">
        {
          (!!courseInfo && !!selectedClass) &&
          <CourseNav courseData={courseInfo} selectedClass={selectedClass} />
        }  
      </m.aside>
      <section className="w-full lg:w-3/4 flex flex-col gap-10 mt-20">
        {
          (!!courseInfo && !!selectedClassData) &&
          <ClassContent courseSlug={courseInfo.slug} classData={selectedClassData} getPrevClass={prevClass} getNextClass={nextClass} setTableIsActive={setTableIsActive}/>
        }
        <CommentsSection />
      </section>
    </main>
	);
}

export default CoursePage
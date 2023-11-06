'use client'

import { useState, useEffect } from "react";

import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation"
import { motion as m } from "framer-motion";
import { createBrowserClient } from '@supabase/ssr';

import CourseNav from "@/components/courses/course-nav";
import CommentsSection from "@/components/courses/comments-section";
import ClassContent from "@/components/courses/class-content";

import { CoursesWithClasses, DbResult } from "@/types/supabase";

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const router = useRouter()
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
  
  const selectedClassData = courseInfo?.classes.find(classData => classData.slug === selectedClass)

  const prevClass = () => {
    if(selectedClassData && selectedClassData.class_number) {
      const prevClassNumber = selectedClassData.class_number - 1;
      const prevClassData = courseInfo?.classes.find(classData => classData.class_number === prevClassNumber)
      if(prevClassData) {
        router.push(`?${new URLSearchParams({
          class: prevClassData.slug
        })}`)
      }
    }
  }
  const nextClass = () => {
    if(selectedClassData && selectedClassData.class_number) {
      const nextClassNumber = selectedClassData.class_number + 1;
      const nextClassData = courseInfo?.classes.find(classData => classData.class_number === nextClassNumber)
      if(nextClassData) {
        router.push(`?${new URLSearchParams({
          class: nextClassData.slug
        })}`)
      }
    }
  }

	return (
		<main className='flex relative px-10 gap-10 bg-secondary -mt-16 pb-20'>
      <m.aside className={`w-5/6 lg:w-1/4 md:w-2/3 z-[900] h-screen lg:h-[75vh] lg:sticky top-0 lg:top-[15%] left-0 ${tableIsActive? 'fixed lg:flex': 'hidden lg:flex'}`}>
        <div className="absolute lg:hidden h-screen w-screen bg-background/50 backdrop-blur left-0 -z-[900]"></div>
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
        {
          !!selectedClassData &&
          <CommentsSection />
        }
      </section>
    </main>
	);
}

export default CoursePage
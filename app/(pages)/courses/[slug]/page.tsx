'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation"
import { Card, CardBody } from "@nextui-org/card"
import { siteContent } from "@/app/_config/content";
import { motion as m } from "framer-motion";
import CourseNav from "@/app/_components/courses/course-nav";
import CommentsSection from "@/app/_components/courses/comments-section";
import ClassContent from "@/app/_components/courses/class-content";

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const [tableIsActive, setTableIsActive] = useState(false)
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class")
  const courseData = siteContent.courses.find((course => course.slug.includes(params.slug)))
  const selectedClassData = courseData?.classes.find(classi => classi.slug === selectedClass)

  const prevClass = () => {
    
  }
  const nextClass = () => {

  }

	return (
		<main className='flex relative px-10 gap-10 bg-secondary -mt-16 pb-20'>
      <m.aside className={`w-5/6 md:w-2/3 z-[900] h-screen top-0 left-0 ${tableIsActive? 'fixed lg:hidden': 'hidden'}`}>
        <div className="absolute h-screen w-screen bg-background/50 backdrop-blur left-0 -z-[900]"></div>
        {
          (!!courseData && !!selectedClass) &&
          <CourseNav courseData={courseData} selectedClass={selectedClass} />
        }  
      </m.aside>
      <m.aside className="hidden lg:flex w-1/4 h-[75vh] sticky top-[15%]">
        {
          (!!courseData && !!selectedClass) &&
          <CourseNav courseData={courseData} selectedClass={selectedClass} />
        }  
      </m.aside>
      <section className="w-full lg:w-3/4 flex flex-col gap-10 mt-20">
        {
          (!!courseData && !!selectedClassData) &&
          <ClassContent courseSlug={courseData.slug} classData={selectedClassData} getPrevClass={prevClass} getNextClass={nextClass} setTableIsActive={setTableIsActive}/>
        }
        <Card className="w-full bg-background">
          <CardBody>
            <CommentsSection />
          </CardBody>
        </Card>
      </section>
    </main>
	);
}

export default CoursePage
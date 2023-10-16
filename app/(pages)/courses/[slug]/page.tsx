'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { title } from "@/app/_components/primitives";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { siteContent } from "@/app/_config/content";
import { motion as m } from "framer-motion";
import dynamic from 'next/dynamic';
import { HiOutlineChevronDoubleLeft, HiXMark, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import CourseNav from "@/app/_components/courses/course-nav";

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const router = useRouter()
  const courseData = siteContent.courses.find((course => course.slug.includes(params.slug)))
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get("class")
  const [tableIsActive, setTableIsActive] = useState(false)
  const selectedClassData = courseData?.classes.find(classi => classi.slug === selectedClass)
  const Content = dynamic(() => import(`@/app/_content/${courseData?.slug}/${selectedClassData?.content}`));
  let currentClassIndex = courseData?.classes.findIndex(courseClass => (courseClass.slug === selectedClass))

  // router.push(`?${new URLSearchParams({
  //   class: courseData.classes[currentClassIndex + 1].slug
  // })}`)

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
        <Card className="relative w-full h-[90vh] bg-background">
          <CardHeader className="w-full flex justify-center pt-20">
            <Button onPress={() => setTableIsActive(true)} variant="flat" isIconOnly className="absolute top-4 left-4 lg:hidden"><HiOutlineChevronDoubleLeft /></Button>
            <h2 className={clsx(title({ size:'md'}), 'text-secondary')}>{selectedClassData?.title}</h2>
            
          </CardHeader>
          <CardBody className="w-full h-[80vh] flex flex-col items-center pt-10">
            <h3 className={clsx(title({ size:'sm'}), 'text-foreground/50')}>{selectedClassData?.description}</h3>
            <div className="prose my-10 text-foreground">
              <Content />
            </div>
          </CardBody>
          <CardFooter className="h-28 px-14">
            <div className="flex gap-4 ml-auto">
              <Button onPress={prevClass} startContent={<HiChevronLeft />} isIconOnly variant="bordered" />
              <Button onPress={nextClass} endContent={<HiChevronRight />}>Siguiente</Button>
            </div>
          </CardFooter>
        </Card>
        <Card className="w-full h-[50vh] bg-background">
          <CardBody>
            Comentarios
          </CardBody>
        </Card>
      </section>
    </main>
	);
}

export default CoursePage
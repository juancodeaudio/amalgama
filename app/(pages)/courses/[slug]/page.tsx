'use client'

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { title } from "@/app/_components/primitives";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { siteContent } from "@/app/_config/content";
import { motion as m } from "framer-motion";
import Lyrics1 from '@/app/_content/lyrics1.mdx'
import Lyrics2 from '@/app/_content/lyrics2.mdx'
import Lyrics3 from '@/app/_content/lyrics3.mdx'
import Lyrics4 from '@/app/_content/lyrics4.mdx'
import Lyrics5 from '@/app/_content/lyrics5.mdx'
import { HiOutlineChevronDoubleLeft, HiXMark, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const courseData = siteContent.courses.find((course => course.slug.includes(params.slug)))

  const [currentClass, setCurrentClass] = useState(0)
  const [tableIsActive, setTableIsActive] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  const lastClass = () => {
    if(courseData && (currentClass === 0)) {
      setCurrentClass(courseData.classes.length - 1)
    } else if (courseData && (currentClass <= courseData.classes.length - 1)) {
      setCurrentClass(currentClass - 1)
    }
  }
  const nextClass = () => {
    if(courseData && (currentClass === courseData.classes.length - 1)) {
      setCurrentClass(0)
    } else if (currentClass >= 0) {
      setCurrentClass(currentClass + 1)
    }
  }

	return (
		<main className='flex relative px-10 gap-10 bg-secondary -mt-16 pb-20'>
      <m.aside className={`w-5/6 md:w-2/3 z-[900] h-screen top-0 left-0 ${tableIsActive? 'fixed lg:hidden': 'hidden'}`}>
        <div className="absolute h-screen w-screen bg-background/50 backdrop-blur left-0 -z-[900]"></div>
        <Card className="relative w-full h-full py-6 bg-background ml-10">
          {
            !!courseData &&
            <>
            <CardHeader>
              <Button onPress={() => setTableIsActive(false)} variant="flat" isIconOnly className="absolute top-4 right-4 z-[9999]"><HiXMark /></Button>
              <h2 className={clsx(title({ size: 'sm' }), 'ml-2 text-secondary')}>{courseData.title}</h2>
            </CardHeader>
            <CardBody className="pt-0">
              <Accordion
                defaultExpandedKeys={[courseData.classes[currentClass].id.toString()]}
              >
                {
                  courseData.classes.map((courseClass) => (
                    <AccordionItem key={courseClass.id} aria-label={courseClass.title} title={courseClass.title} subtitle={courseClass.description} className="mb-6">
                      {
                        courseClass.sections.map((section) => (
                          <Button variant="flat" onPress={() => setCurrentClass(courseData.classes.indexOf(courseClass))} color={courseClass.id === courseData.classes[currentClass].id ? 'secondary': 'default'} className="w-full justify-start" key={section.id}>{section.title}</Button>
                        ))
                      }
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </CardBody>
            </>
          }
        </Card>
      </m.aside>
      <m.aside className="hidden lg:flex w-1/4 h-[75vh] sticky top-[15%]">
        <Card className="w-full h-full py-6 bg-background">
          {
            !!courseData &&
            <>
            <CardHeader>
              <h2 className={clsx(title({ size: 'sm' }), 'ml-2 text-secondary')}>{courseData.title}</h2>
            </CardHeader>
            <CardBody className="pt-0">
              <Accordion defaultExpandedKeys={[courseData.classes[currentClass].id.toString()]}>
                {
                  courseData.classes.map((courseClass) => (
                    <AccordionItem key={courseClass.id} aria-label={courseClass.title} title={courseClass.title} subtitle={courseClass.description} className="mb-6">
                      {
                        courseClass.sections.map((section) => (
                          <Button variant="flat" onPress={() => setCurrentClass(courseData.classes.indexOf(courseClass))} color={courseClass.id === courseData.classes[currentClass].id ? 'secondary': 'default'} className="w-full justify-start" key={section.id}>{section.title}</Button>
                        ))
                      }
                    </AccordionItem>
                  ))
                }
              </Accordion>
            </CardBody>
            </>
          }
        </Card>
      </m.aside>
      <section className="w-full lg:w-3/4 flex flex-col gap-10 mt-20">
        <Card className="relative w-full h-[90vh] bg-background">
          <CardHeader className="w-full flex justify-center pt-20">
            <Button onPress={() => setTableIsActive(true)} variant="flat" isIconOnly className="absolute top-4 left-4 lg:hidden"><HiOutlineChevronDoubleLeft /></Button>
            <h2 className={clsx(title({ size:'md'}), 'text-secondary')}>{courseData?.classes[currentClass].title}</h2>
          </CardHeader>
          <CardBody className="w-full h-[80vh] flex flex-col items-center pt-10">
            <h2 className={title({ size:'sm'})}>{courseData?.classes[currentClass].sections[0].title}</h2>
            <div className="prose my-10 text-foreground">
              {currentClass === 0 && <Lyrics1 />}
              {currentClass === 1 && <Lyrics2 />}
              {currentClass === 2 && <Lyrics3 />}
              {currentClass === 3 && <Lyrics4 />}
              {currentClass === 4 && <Lyrics5 />}
            </div>
          </CardBody>
          <CardFooter className="h-28 px-14">
            <div className="flex gap-8 ml-auto">
              <Button onPress={lastClass} startContent={<HiChevronLeft />} isIconOnly variant="bordered"></Button>
              <Button  onPress={nextClass} endContent={<HiChevronRight />}>Siguiente</Button>
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
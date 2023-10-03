'use client'

import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { title } from "@/app/_components/primitives";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { siteContent } from "@/app/_config/content";
import Lyrics1 from '@/app/_content/lyrics1.mdx'
import Lyrics2 from '@/app/_content/lyrics2.mdx'
import Lyrics3 from '@/app/_content/lyrics3.mdx'
import Lyrics4 from '@/app/_content/lyrics4.mdx'
import Lyrics5 from '@/app/_content/lyrics5.mdx'

const CoursePage = ({ params }: { params: { slug: string }}) => {

  const courseData = siteContent.courses.find((course => course.slug.includes(params.slug)))

  const [currentClass, setCurrentClass] = useState(0)
  const searchParams = useSearchParams()

  if(!!courseData) {
    const queryClass = searchParams.get('c')
    // queryClass
    // ? setCurrentClass(courseData.classes.find((clase => clase.id.toString().includes(queryClass))))
    // : setCurrentClass(courseData.classes[0])
    const section = searchParams.get('s')
  
  }

	return (
		<main className='flex px-10 gap-10'>
      <aside className="w-1/4 h-[75vh] sticky top-[15%]">
        <Card className="w-full h-full py-6">
          {
            !!courseData &&
            <>
            <CardHeader>
              <h2 className={clsx(title({ size: 'sm' }), 'ml-2 text-primary')}>{courseData.title}</h2>
            </CardHeader>
            <CardBody className="pt-0">
              <Accordion defaultExpandedKeys={[courseData.classes[currentClass].id.toString()]}>
                {
                  courseData.classes.map((courseClass) => (
                    <AccordionItem key={courseClass.id} aria-label={courseClass.title} title={courseClass.title} subtitle={courseClass.description} className="mb-6">
                      {
                        courseClass.sections.map((section) => (
                          <Button variant="flat" onPress={() => setCurrentClass(courseData.classes.indexOf(courseClass))} color={courseClass.id === courseData.classes[currentClass].id ? 'primary': 'default'} className="w-full justify-start" key={section.id}>{section.title}</Button>
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
      </aside>
      <section className="w-3/4 flex flex-col gap-10">
        <Card className="w-full h-[90vh]">
          <CardHeader className="w-full flex justify-center pt-20">
            <h2 className={title({ size:'md'})}>{courseData?.classes[currentClass].title}</h2>
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
        </Card>
        <Card className="w-full h-[50vh]">
          <CardBody>
            Comentarios
          </CardBody>
        </Card>
      </section>
    </main>
	);
}

export default CoursePage

{/* <Tabs
              fullWidth
              size="md"
              color="primary"
            >
              <Tab key="intro" title="Introducción"><LyricsFirst /></Tab>
              <Tab key="segunda" title="Segunda"><LyricsSecond /></Tab>
              <Tab key="tercera" title="Tercera"><LyricsThird /></Tab>
              <Tab key="cuarta" title="Cuarta"><LyricsFourth /></Tab>
            </Tabs> */}
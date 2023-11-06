import clsx from "clsx"
import NextLink from "next/link"

import { title } from "@/components/primitives"
import { CoursesWithClasses } from "@/types/supabase";

import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card"

type CourseNavProps = {
  courseData: CoursesWithClasses,
  selectedClass: string,
}

const CourseNav = ({courseData, selectedClass}: CourseNavProps) => {
  return (
    <Card className="w-full h-full py-6 bg-background">
        <CardHeader>
          <h2 className={clsx(title({ size: 'sm' }), 'ml-2 text-secondary')}>{courseData.title}</h2>
        </CardHeader>
        <CardBody className="pt-0">
        <ul className="flex flex-col gap-4">
          {
            courseData.classes.map((courseClass) => (
                <Button
                  variant="flat"
                  as={NextLink}
                  href={`?${new URLSearchParams({
                    class: courseClass.slug
                  })}`}
                  color={courseClass.slug === selectedClass ? 'secondary': 'default'} 
                  className="w-full h-auto py-2 flex flex-col items-start"
                  key={courseClass.slug}
                >
                  <h4 className="uppercase font-bold text-base">{courseClass.title}</h4>
                  <div className="flex justify-between w-full opacity-50 text-sm gap-2">
                    <p className="whitespace-normal text-left">{courseClass.description}</p>
                    <p>{`${courseClass.duration} min`}</p>
                  </div>
                </Button>
            ))
          }
        </ul>
      </CardBody>
    </Card>
  )
}

export default CourseNav
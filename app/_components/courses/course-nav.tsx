import clsx from "clsx"
import NextLink from "next/link"

import { title } from "@/components/primitives"
import { CoursesWithClasses } from "@/types/supabase";

import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { HiOutlineChevronDoubleLeft } from "react-icons/hi2";

type CourseNavProps = {
  courseData: CoursesWithClasses,
  selectedClass: string,
  setTableIsActive: (value: boolean) => void
}

const CourseNav = ({courseData, selectedClass, setTableIsActive}: CourseNavProps) => {
  return (
    <Card className="w-full h-full py-6 bg-background relative">
        <Button onPress={() => setTableIsActive(false)} variant="flat" isIconOnly className="absolute top-4 right-4 lg:hidden z-40"><HiOutlineChevronDoubleLeft /></Button>
        <CardHeader className="relative">
          <h2 className={clsx(title({ size: 'sm' }), 'ml-2 text-secondary')}>{courseData.title}</h2>
        </CardHeader>
        <CardBody className="pt-0">
        <ScrollShadow hideScrollBar>
          <ul className="flex flex-col gap-4">
            {
              courseData.classes
              .sort((a, b) => a.class_number - b.class_number)
              .map((courseClass) => (
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
        </ScrollShadow>
      </CardBody>
    </Card>
  )
}

export default CourseNav
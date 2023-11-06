import clsx from "clsx";
import dynamic from 'next/dynamic';

import { title } from "@/components/primitives";

import { Tables } from "@/types/supabase";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { HiOutlineChevronDoubleLeft, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type ClassContentType = {
  courseSlug: string,
  classData: Tables<'classes'>,
  getPrevClass: () => void,
  getNextClass: () => void,
  setTableIsActive: (value: boolean) => void
}

const ClassContent = ({ courseSlug, classData, getPrevClass, getNextClass, setTableIsActive }: ClassContentType) => {

  const Content = dynamic(() => import(`@/app/_content/${courseSlug}/${classData.content}`));
  const handlePrevClass = () => {
    getPrevClass()
  }
  const handleNextClass = () => {
    getNextClass()
  }

  return (
    <Card className="relative w-full h-[90vh] bg-background">
      <CardHeader className="w-full flex justify-center pt-20 pb-0">
        <Button onPress={() => setTableIsActive(true)} variant="flat" isIconOnly className="absolute top-4 left-4 lg:hidden"><HiOutlineChevronDoubleLeft /></Button>
        <h2 className={clsx(title({ size:'md'}), 'text-secondary')}>{classData.title}</h2>
      </CardHeader>
      <CardBody className="w-full h-[80vh] flex flex-col items-center pt-10 gap-6">
        <h3 className={clsx(title({ size:'sm'}), 'text-foreground/50')}>{classData.description}</h3>
        <ScrollShadow hideScrollBar className="prose text-foreground">
          <Content />
        </ScrollShadow>
      </CardBody>
      <CardFooter className="h-28 px-14">
        <div className="flex gap-4 ml-auto">
          <Button className={classData.class_number === 1 ? 'hidden' : ''} onPress={handlePrevClass} startContent={<HiChevronLeft />} isIconOnly variant="bordered" />
          <Button onPress={handleNextClass} endContent={<HiChevronRight />}>Siguiente</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ClassContent
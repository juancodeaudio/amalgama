import clsx from "clsx";
import dynamic from 'next/dynamic';
import Link from "next/link";

import { title } from "@/components/primitives";
import VideoPlayer from "./videos/video-player";

import { Tables } from "@/types/supabase";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { HiOutlineChevronDoubleLeft, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type ClassContentType = {
  totalClasses: number
  courseSlug: string,
  classData: Tables<'classes'>,
  getPrevClass: () => void,
  getNextClass: () => void,
  setTableIsActive: (value: boolean) => void
}

const ClassContent = ({ totalClasses, courseSlug, classData, getPrevClass, getNextClass, setTableIsActive }: ClassContentType) => {

  const isLastClass = classData.class_number === totalClasses;
  const Content = dynamic(() => import(`@/app/_content/${courseSlug}/${classData.content}`));
  const handlePrevClass = () => {
    getPrevClass()
  }
  const handleNextClass = () => {
    getNextClass()
  }

  return (
    <Card className={`relative w-full ${!classData.is_video && 'h-[90vh]'} bg-background rounded-none lg:rounded-xl`}>
      <CardHeader className="w-full flex justify-center pt-10 pb-0">
        <Button onPress={() => setTableIsActive(true)} variant="flat" isIconOnly className="absolute top-4 left-4 lg:hidden"><HiOutlineChevronDoubleLeft /></Button>
        <h2 className={clsx(title({ size:'md'}), 'text-secondary')}>{classData.title}</h2>
      </CardHeader>
      <CardBody className={`w-full ${!classData.is_video && 'h-[80vh]'} flex flex-col items-center pb-0 pt-6 gap-6`}> 
        {
          (!classData.is_quiz && !classData.is_video) && (
            <h3 className={clsx(title({ size:'sm'}), 'text-foreground/50')}>{classData.description}</h3>
          )
        }
        {
          !classData.is_video
          ? (    
            <ScrollShadow hideScrollBar className="prose text-foreground w-full h-full">
              <Content />
            </ScrollShadow>
          )
          : (
            // <p>Trabajando en el video... ¡Espéralo!</p>
            <VideoPlayer
              videoUrl={classData.content}
            />
          )
        }
      </CardBody>
      <CardFooter className="h-20 px-14">
        <div className="flex gap-4 mx-auto lg:mx-0 lg:ml-auto">
          <Button className={classData.class_number === 1 ? 'hidden' : ''} onPress={handlePrevClass} startContent={<HiChevronLeft />} isIconOnly variant="bordered" />
          {
            !isLastClass
            ? <Button onPress={handleNextClass} endContent={<HiChevronRight />}>Siguiente</Button>
            : <Button as={Link} href={`/courses/${courseSlug}/congratulations`} color="secondary" className="text-background">Finalizar</Button>
          }
        </div>
      </CardFooter>
    </Card>
  )
}

export default ClassContent
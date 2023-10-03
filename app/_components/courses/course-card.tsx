import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Button } from "@nextui-org/button";
import { title } from "@/app/_components/primitives";
import clsx from "clsx";
import { HiHeart, HiArrowRight } from "react-icons/hi2";

type CourseCardProps = {
  courseTitle: string,
  description: string,
  href: string
}

const CourseCard = ({courseTitle, description, href}: CourseCardProps) => {
  return (
    <Card className="h-full w-1/3">
      <CardHeader className="w-full flex justify-center items-center">
        <Image
          isZoomed
          width={600}
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
          alt="Imagen de curso"
          className="w-full"
        />
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <h2 className={title({ size: 'sm'})}>{courseTitle}</h2>
        <p className="opacity-70">{description}</p>
      </CardBody>
      <CardFooter className="bg-white/10 h-24 px-6 justify-between">
        <div>
          <p className="text-tiny">10 Lecciones</p>
          <p className="text-tiny">4 horas</p>
        </div>
        <Button
          className={"text-foreground border-default-200 ml-auto"}
          color="primary"
          radius="full"
          size="sm"
          variant="flat"
          startContent={<HiHeart className="h-5 w-5" />}
          isIconOnly
        />
        <Link href={href}>
          <Button
            className="text-tiny ml-4 w-16"
            color="primary"
            radius="full"
            size="sm"
            startContent={<HiArrowRight className="h-5 w-5" />}
            isIconOnly
          />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CourseCard
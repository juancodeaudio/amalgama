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
    <Card 
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-6 sm:gap-4 items-center justify-center lg:grid-cols-6 lg:gap-6">
          <div className="relative col-span-6 sm:col-span-4 lg:col-span-6">
            <Image
              alt="Imagen del curso"
              className="object-cover"
              height={200}
              shadow="md"
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
              width="100%"
            />
          </div>
          <div className="flex flex-col col-span-6 sm:col-span-8 lg:col-span-6">
            <h2 className={title({ size: 'sm'})}>{courseTitle}</h2>
            <p className="opacity-70">{description}</p>
            <div className="flex mt-5">
              <div>
                <p className="text-tiny opacity-70">5 Lecciones</p>
                <p className="text-tiny opacity-70">4 horas</p>
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
            </div>
          </div>
        </div>
      </CardBody>
      {/* <CardFooter className="bg-white/10 h-14 lg:h-24 px-6 justify-between">
        <div>
          <p className="text-tiny">5 Lecciones</p>
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
      </CardFooter> */}
    </Card>
  )
}

export default CourseCard
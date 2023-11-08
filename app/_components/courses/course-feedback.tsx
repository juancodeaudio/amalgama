import clsx from "clsx";
import { title } from "../primitives";

import StarRating from "./star-rating";

import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

import { HiPaperAirplane } from "react-icons/hi2";

const CourseFeedback = () => {
  return (
    <CardFooter className="flex-col gap-4">
          <h3 className={clsx(title({ size: "xs"}), 'text-primary')}>¿Qué te pareció el curso?</h3>
          <Textarea
              label="Deja tu comentario..."
              variant="faded"
              className="w-full max-w-[400px]"
          />
          <div className="flex items-center gap-8">
            <StarRating />
            <Button
              color="primary"
              className=""
              startContent={<HiPaperAirplane className="text-lg" />}
            >
              Enviar
            </Button>
          </div>  
        </CardFooter>
  )
}

export default CourseFeedback
import Link from "next/link";

import {CircularProgress} from "@nextui-org/progress";
import { Image } from '@nextui-org/image';
import { Card } from '@nextui-org/card'
import { Button } from "@nextui-org/button";

import ReactCanvasConfetti from "react-canvas-confetti";
import { HiHome, HiQueueList } from "react-icons/hi2";
import Confetti from '@/components/courses/confetti';

type ExamEndProps = {
  score: number,
  totalQuestions: number
}

const ExamEnd = ({ score, totalQuestions }: ExamEndProps) => {
  const percentage = (score / totalQuestions) * 100;
  const getMessages = () => {
    if (percentage < 50) {
      return [
        "¡No te desanimes!",
        "¡El aprendizaje es un viaje! Revisa esas respuestas y sigue avanzando. ¡Tu progreso no tiene límites!"
      ]
    }
    if (percentage < 90) {
      return [
        "¡Buen trabajo!",
        "Has demostrado un sólido conocimiento en este quiz. ¡Sigue esforzándote y conquistando nuevos desafíos!"
      ]
    }
    return [
      "¡Increíble!",
      "Eres un auténtico maestro de las letras. ¡Celebra tu éxito y no pares de aprender!"
    ]
  }
  const getWheelColors = () => {
    if (percentage < 50) {
      return {
        stroke: "stroke-danger",
        track: "stroke-danger/10",
        text: "text-danger"
      }
    }
    if (percentage < 90) {
      return {
        stroke: "stroke-warning",
        track: "stroke-warning/10",
        text: "text-warning"
      }
    }
    return {
      stroke: "stroke-success",
      track: "stroke-success/10",
      text: "text-success"
    }
  }
  const getImages = () => {
    if (percentage < 50) {
      return {
        image: "/trophy-bronze.svg",
        alt: "trophy-bronze"
      }
    }
    if (percentage < 90) {
      return {
        image: "/trophy-silver.svg",
        alt: "trophy-silver"
      }
    }
    return {
      image: "/trophy-gold.svg",
      alt: "trophy-gold"
    }
  }

  return (
    <div className="flex flex-col items-center relative">
      {
        percentage > 50 &&
        <Confetti />
      }
      <h1 className={`${getWheelColors().text} mb-0 text-5xl`}>{getMessages()[0]}</h1>
      <div className="flex justify-center items-center">
        <Image
          src={getImages().image}
          alt={getImages().alt}
          width={220}
          height={220}
        />
      </div>
      <Card className="flex flex-row gap-8 p-5 items-center">
        <CircularProgress
          value={score}
          valueLabel={(score) + ' / ' + totalQuestions}
          maxValue={totalQuestions}
          size="lg"
          strokeWidth={2}
          showValueLabel={true}
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: `${getWheelColors().stroke}`,
            track: `${getWheelColors().track}`,
            value: `text-3xl font-semibold ${getWheelColors().text}`,
          }}
        />
        <div>
          <p className="mt-0">{getMessages()[1]}</p>
          <div className="flex flex-row mx-auto gap-6 items-end">
            <Button
              variant="bordered"
              startContent={<HiHome className="text-lg" />}
              color="secondary"
              isIconOnly
              as={Link}
              href="/"
            />
            <Button
              as={Link}
              href="/courses"
              endContent={<HiQueueList className="text-lg" />}
              color="secondary"
            >
              Explora más cursos
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ExamEnd
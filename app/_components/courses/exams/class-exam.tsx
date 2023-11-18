import { useState } from 'react'

import {Button} from '@nextui-org/button'
import { lyricsExam } from '@/app/_content/lyrics/lyrics-exam'
import ExamEnd from './exam-end';
import AudioColorButton from '../content-blocks/audio-color-button';

import {CircularProgress} from "@nextui-org/progress";
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'

import { HiChevronRight, HiOutlineXCircle, HiOutlineCheckCircle, HiOutlinePlay } from 'react-icons/hi2'

type QuestionTypes = typeof lyricsExam[number]
type ClassExamProps = {
  questions: QuestionTypes[]
}

const ClassExam = ({questions}: ClassExamProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isGraded, setIsGraded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<QuestionTypes['options'][number] | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  
  const getOptionColor = (option: QuestionTypes['options'][number]) => {
    if(isGraded) {
      if(option.isCorrect) {
        return 'success'
      }
      if(option === selectedOption) {
        return 'danger'
      }
    } else {
      if(option === selectedOption) {
        return 'secondary'
      }
    }
    return 'default'
  }
  const getOptionIcon = (option: QuestionTypes['options'][number]) => {
    if(isGraded) {
      if(option.isCorrect) {
        return <HiOutlineCheckCircle className='h-6 w-6' />
      }
      if(option === selectedOption) {
        return <HiOutlineXCircle className='h-6 w-6' />
      }
    } else {
      if(option === selectedOption) {
        return <HiOutlineCheckCircle className='h-6 w-6' />
      }
    }
    return null
  }

  const handleOptionClick = (option: QuestionTypes['options'][number]) => {
    setSelectedOption(option)
  }
  const handleGradeQuestion = () => {
    if(selectedOption) {
      if (currentQuestion + 1 < questions.length){
        (selectedOption.isCorrect) && setScore(score + 1)
      } else {
        (selectedOption.isCorrect) && setScore(score + 1)
        // setIsFinished(true)
      }
    }
    setIsGraded(true)
  }
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length){
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsFinished(true)
    }
    setIsGraded(false)
    setSelectedOption(null)
  }
  if(isFinished) return (
    <ExamEnd
      score={score}
      totalQuestions={questions.length}
    />
  )

  return (
    <div className='flex flex-col w-full h-full py-3 pb-7 items-center justify-between'>
      <CircularProgress
        value={currentQuestion + 1}
        valueLabel={(currentQuestion + 1) + ' / ' + questions.length}
        maxValue={questions.length}
        size="lg"
        strokeWidth={2}
        showValueLabel={true}
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "stroke-secondary",
          value: "text-3xl font-semibold text-foreground",
        }}
      />
      <Card className='flex flex-col w-full'>
        <CardHeader className='justify-between relative py-0 px-5'>
          {
            questions[currentQuestion].audio !== null && (
              <AudioColorButton
                className='mr-4 h-10 w-10 bg-secondary hover:scale-110 hover:bg-secondary/80 transform transition-all duration-300 ease-in-out'
                file={questions[currentQuestion].audio || ''}
              >
                <HiOutlinePlay className='h-6 w-6' />
              </AudioColorButton>
            )
          }
          <p className='w-5/6'>{questions[currentQuestion].question}</p>
          <CircularProgress
            value={score}
            valueLabel={(score) + ' / ' + questions.length}
            maxValue={questions.length}
            size="lg"
            showValueLabel={true}
            color='success'
            classNames={{
              value: "text-tiny font-semibold text-success",
            }}
          />
        </CardHeader>
        <CardBody className='flex flex-col gap-4 py-0'>
          {
            questions[currentQuestion].options.map((option, index) => (
              <Button
                isDisabled={isGraded}
                variant={selectedOption === option ? 'flat' : 'ghost'}
                key={index}
                onPress={() => handleOptionClick(option)}
                className='justify-between'
                color={getOptionColor(option)}
                endContent={getOptionIcon(option)}
              >
                {option.answer}
              </Button>
            ))
          }
        </CardBody>
        <CardFooter className='justify-end px-5 pb-5 gap-4'>
          <Button
            isDisabled={!selectedOption}
            size='sm'
            color={selectedOption ? 'success' : 'default'}
            variant="flat"
            onPress={handleGradeQuestion}
            className={isGraded ? 'hidden' : ''}
          >
            Calificar
          </Button>
          <Button
            isDisabled={!isGraded}
            size='sm'
            color={isGraded ? 'secondary' : 'default'}
            variant={isGraded ? 'bordered' : 'ghost'}
            isIconOnly={currentQuestion + 1 < questions.length}
            endContent={<HiChevronRight className='h-4 w-4' />}
            onPress={handleNextQuestion}
          >
            {currentQuestion + 1 < questions.length ? '' : 'Finalizar'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ClassExam
import { useState } from 'react'

import {Button} from '@nextui-org/button'
import { lyricsExam } from '@/app/_content/lyrics/lyrics-exam'

type QuestionTypes = typeof lyricsExam[number]
type ClassExamProps = {
  questions: QuestionTypes[]
}

const ClassExam = ({questions}: ClassExamProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleAnswerButtonClick = (isCorrect: boolean, e: React.MouseEvent) => {
    if(isCorrect) {
      setScore(score + 1)
    }
    if(currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsFinished(true)
    }
  }

  return (
    <div className='flex flex-col h-96'>
      <div>
        <h2>Pregunta {currentQuestion + 1} de {questions.length}</h2>
        <p>{questions[currentQuestion].question}</p>
      </div>
      <div className='flex flex-col'>
        {
          questions[currentQuestion].options.map((option, index) => (
            <Button
            variant='ghost'
              key={index}
              onClick={(e) => handleAnswerButtonClick(option.isCorrect, e)}
            >
              {option.answer}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default ClassExam
import { useState } from 'react'
import { HiStar, HiOutlineStar } from 'react-icons/hi2'
import { Button } from '@nextui-org/button'

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
  isSubmitted: boolean;
}

const StarRating = ({rating, setRating, isSubmitted}: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex justify-center">
      {
        [...Array(5)].map((_, index) => {
          index += 1
          return (
            <Button
              isDisabled={isSubmitted}
              key={index}
              variant='light'
              size='sm'
              className="text-primary"
              startContent={index <= (hover || rating) ? <HiStar className="text-primary text-2xl" /> : <HiOutlineStar className="text-primary text-2xl" />}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              isIconOnly
              onPress={() => setRating(index)}
            />
          )
        })
      }
    </div>
  )
}

export default StarRating
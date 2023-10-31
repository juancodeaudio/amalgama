import React from 'react'
import { Button } from '@nextui-org/button'
import { HiPaperAirplane } from 'react-icons/hi2'

const CommentsForm = () => {
  return (
    <form
      // onSubmit={handleSubmit}
      className="mb-6"
    >
      <div className="py-2 px-4 mb-4 bg-foreground/10 rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <textarea
          id="comment"
          // onChange={onChange}
          rows={6}
          className="px-0 w-full text-sm text-foreground border-0 focus:ring-0 focus:outline-none dark:placeholder-foreground/60 bg-transparent"
          placeholder="Write a comment..."
          required
        />
      </div>
      <Button
        type="submit"
        color='secondary'
        className='text-background'
        endContent={<HiPaperAirplane />}
      >
        Enviar
      </Button>
    </form>
  )
}

export default CommentsForm
import clsx from "clsx"
import { title } from "../primitives"
import CommentsForm from "./comments-form"
import CommentBox from "./comment-box"
import { siteContent } from "@/app/_config/content";

const CommentsSection = () => {
  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className={clsx(title({ size:'sm'}), 'text-foreground')}>Comentarios (20)</h2>
        </div>
        <CommentsForm />
        {
          siteContent.comments.map((comment, index) => (
            <CommentBox
              key={index}
              authorName={comment.authorName}
              authorImage={comment.authorImage}
              date={comment.date}
              content={comment.content}
            />
          )
          )
        }
      </div>
    </section>
  )
}

export default CommentsSection
import { Button } from "@nextui-org/button"
import { User} from "@nextui-org/user"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { HiArrowUturnLeft, HiEllipsisHorizontal, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"

type CommentType = {
  authorName: string,
  authorImage: string,
  date: string,
  content: string
}

const CommentBox = ({authorName, authorImage, date, content}: CommentType) => {
  return (
    <article className="p-6 text-base border-b border-b-foreground/20 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <User
            name={authorName}
            description={date}
            avatarProps={{
              size: "sm",
              src: authorImage
            }}
          />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="flat"
              isIconOnly
              startContent={<HiEllipsisHorizontal />}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            disabledKeys={["edit"]}
          >
            <DropdownItem
              key="edit"
              startContent={<HiOutlinePencilSquare />}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<HiOutlineTrash />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        {content}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <Button
          variant="light"
          startContent={<HiArrowUturnLeft />}
        >
          Reply
        </Button>
      </div>
    </article>
  )
}

export default CommentBox
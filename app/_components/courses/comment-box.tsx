'use client'
import { Button } from "@nextui-org/button"
import { User} from "@nextui-org/user"
import { useAuth } from '@clerk/nextjs'
import { createBrowserClient } from "@supabase/ssr"
import { createClient } from '@supabase/supabase-js';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { HiArrowUturnLeft, HiEllipsisHorizontal, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"

type CommentType = {
  commentId?: string,
  setCommentsData?: (value: any) => void,
  authorName: string,
  authorImage: string,
  date: string,
  content: string,
  isDeletable?: boolean
}

const CommentBox = ({commentId, setCommentsData, authorName, authorImage, date, content, isDeletable}: CommentType) => {
  
  const { getToken } = useAuth();
  
  const confirmDelete = async (id: string | undefined) => {
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      }
    )
    const ok = window.confirm("Delete comment?");
    if (ok) {
      const { error } = await supabase.from("comments").delete().match({ id });
      if (!error) {
        setCommentsData && setCommentsData((prev: any) => prev.filter((comment: any) => comment.id !== id));
        window.alert("Deleted Comment :)");
      } else {
        window.alert(error?.message);
      }
    }
  };

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
        {
          isDeletable &&
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
                >
                <Button
                  variant="flat"
                  className="w-full"
                  size="sm"
                  startContent={<HiOutlinePencilSquare />}
                  isDisabled
                  onPress={() => console.log('edit')}
                >  
                  Edit
                </Button>
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                >
                <Button
                  variant="flat"
                  className="w-full"
                  size="sm"
                  startContent={<HiOutlineTrash />}
                  onPress={() => confirmDelete(commentId)}
                >
                Delete
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
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
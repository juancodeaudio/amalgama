'use client'
import { Button } from "@nextui-org/button"
import { User} from "@nextui-org/user"
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { HiArrowUturnLeft, HiEllipsisHorizontal, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"
import { Tables, CommentWithReplies } from "@/app/_types/supabase"
import { stringifyDate } from "@/app/_utils/stringifyDate";

type CommentType = {
  comment: CommentWithReplies,
  commentReplies?: Tables<'comments'>[],
  setCommentsData?: (value: any) => void,
  authorName: string,
  authorImage: string,
  isDeletable?: boolean,
  setReplyOf: (value: string | null) => void,
  isReply?: boolean
}

const CommentBox = ({ comment, setCommentsData, authorName, authorImage, isDeletable, setReplyOf, isReply}: CommentType) => {
  
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
        window.alert("Deleted Comment :)");
        setCommentsData && setCommentsData((prev: any) => prev.filter((comment: any) => comment.id !== id));
      } else {
        window.alert(error?.message);
      }
    }
  };

  return (
    <>
    {
      comment &&
      <article className={`p-6 text-base ${isReply ? 'pr-0 border-t border-t-foreground/20' : 'border-b border-b-foreground/20 mb-4 py-2'}`}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <User
              name={authorName}
              description={stringifyDate(comment.created_at)}
              avatarProps={{
                size: "sm",
                src: authorImage,
                name: '',
                showFallback: true,
              }}
              classNames={{
                description: "text-foreground/40 text-tiny",
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
                    onPress={() => confirmDelete(comment.id)}
                  >
                  Delete
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
        </div>
        <p className="text-foreground/70">
          {comment.content}
        </p>
        {
          !isReply &&
          <div className="flex items-center mt-1 mb-2 ml-12">
            <Button
              variant="light"
              type="button"
              size="sm"
              onPress={() => setReplyOf(comment.id || null)}
              startContent={<HiArrowUturnLeft />}
              className="text-tiny hover:text-secondary"
            >
              Responder
            </Button>
          </div>
        }
        <div className="grid grid-cols-12 grid-rows-1 gap-0">
          { 
            ((!isReply && comment.replies) && (comment.replies.length > 0)) && 
            <div className="pb-[75px]">
              <div className="ml-4 h-full w-4 rounded-bl-lg border-l-large border-b-large opacity-10"></div>
            </div>
          }
          <div className="col-span-11">
            {
              comment.replies &&
              comment.replies.map((reply, index) => (
                <CommentBox
                  key={index}
                  comment={reply}
                  authorName={authorName}
                  authorImage={authorImage}
                  isDeletable={isDeletable}
                  setReplyOf={setReplyOf}
                  isReply
                />
              ))
            }
          </div>
        </div>
      </article>
    }
    </>
  )
}

export default CommentBox
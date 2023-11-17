'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'

import { HiEllipsisHorizontal, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2"

type CommentboxOptionsProps = {
  onOpen: () => void
}

const CommentboxOptions = ({ onOpen } : CommentboxOptionsProps) => {
  return (
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
            onPress={onOpen}
          >
          Delete
          </Button>
          
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default CommentboxOptions
'use client'

import { useUser } from "@clerk/nextjs";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/dropdown";
import { SignOutButton } from "@clerk/nextjs";
import {Avatar} from "@nextui-org/avatar";

const UserDropdown = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              // color="primary"
              // name={user?.fullName}
              size="sm"
              src={user?.imageUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold text-primary">{`@${user?.username}`}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              <SignOutButton />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
  )
}

export default UserDropdown
'use client'

import { useUser } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";

import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar"
import { User } from "@nextui-org/user"
import { Link } from "@nextui-org/link"
import { Divider } from "@nextui-org/divider"

type MobileMenuProps = {
  searchInput: JSX.Element
}

const MobileMenu = ({searchInput}: MobileMenuProps) => {
  const { user } = useUser()
  return (
    <NavbarMenu className="pt-6 flex flex-col">
      <NavbarMenuItem className="bg-foreground/5 p-5 rounded-lg">
        <User   
          name={user?.fullName}
          description={(
            <Link href="/" size="sm" isExternal>
              @{user?.username}
            </Link>
          )}
          avatarProps={{
            src: user?.imageUrl
          }}
          className="justify-start"
        />
      </NavbarMenuItem>
      <Divider className="mt-4 mb-1" />
      {/* {searchInput} */}
      <div className="mx-4 mt-2 flex flex-col gap-8">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
      <Divider className="mt-4 mb-1" />
      <NavbarMenuItem className="mx-4 mt-6">
        <SignOutButton />
      </NavbarMenuItem>
    </NavbarMenu>
  )
}

export default MobileMenu
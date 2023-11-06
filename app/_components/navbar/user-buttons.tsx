'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import UserDropdown from '@/components/navbar/user-dropdown';

import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';

const UserButtons = () => {
  return (
    <>
    <SignedIn>
      <NavbarItem className="hidden lg:flex">
        <UserDropdown />
      </NavbarItem>
    </SignedIn>
    <SignedOut>
      <NavbarItem className="hidden lg:flex gap-2">
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
        <SignInButton>
          <Button variant='bordered'>Sign In</Button>
        </SignInButton>
      </NavbarItem>
    </SignedOut>
    </>
  )
}

export default UserButtons
'use client'
import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import UserDropdown from './user-dropdown';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const UserButtons = () => {
  return (
    <>
    <SignedIn>
      <NavbarItem className="hidden lg:flex">
        <UserDropdown />
        {/* <UserButton /> */}
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
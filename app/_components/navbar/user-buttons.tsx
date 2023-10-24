'use client'
import { useUser } from '@clerk/nextjs';
import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import UserDropdown from './user-dropdown';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

const UserButtons = () => {
  const { isSignedIn, user, isLoaded } = useUser();
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
        <SignInButton mode='modal'>
          <Button variant='bordered'>Sign In</Button>
        </SignInButton>
      </NavbarItem>
    </SignedOut>
    </>
  )
}

export default UserButtons
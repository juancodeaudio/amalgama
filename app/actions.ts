'use server'
import { clerkClient } from '@clerk/nextjs';
 
export async function getUsers() {
  const users = await clerkClient.users.getUserList();
  return users;
}
import type { User } from "@clerk/nextjs/dist/types/server";

export const getUserInfo = (users: User[], userId: string) => {
  const user = users.find(user => user.id === userId)
  if(user?.firstName === undefined || user?.lastName === undefined) {
    return {firstName: 'Usuario', name: 'Usuario', image: ''}
  }
  return {
    firstName: `${user?.firstName}`,
    name: `${user?.firstName} ${user?.lastName}`,
    image: `${user?.imageUrl}`
  }
}
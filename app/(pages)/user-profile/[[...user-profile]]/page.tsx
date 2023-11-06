import { UserProfile } from "@clerk/nextjs";

import SavedCourses from "@/components/user-profile/saved-courses";
 
const UserProfilePage = () => (
  <main className="flex">
    <UserProfile
      path="/user-profile"
      routing="path"
      appearance={{
        elements: {
          card: "bg-background text-foreground shadow-none",
          navbarMobileMenuButton: "hidden",
          headerTitle: "text-primary",
          profileSectionTitleText: "text-foreground",
          profileSectionTitleText__danger: "text-red-500",
          profileSectionContent: "!text-foreground",
          profileSectionPrimaryButton: "text-foreground hover:bg-foreground/10 text-sm normal-case",
          accordionTriggerButton: "text-foreground hover:bg-foreground/10 text-sm normal-case",
          badge: "bg-primary/30 text-primary",
        },
      }}
    />
    <SavedCourses />
  </main>
);
 
export default UserProfilePage;
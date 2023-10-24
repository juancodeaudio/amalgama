import { SignIn } from '@clerk/nextjs'

const Page = async () => {

  return (
    <section className='py-24'>
      <div className='w-full'>
        <div className='flex justify-center'>
          <SignIn
            appearance={{
              elements: {
                card: "bg-background",
                headerTitle: "text-foreground",
                headerSubtitle: "text-foreground",
                socialButtonsBlockButton: "text-foreground border-foreground",
                dividerText: "text-foreground",
                dividerLine: "bg-foreground",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background text-foreground border-foreground focus:border-primary outline-none",
                formButtonPrimary: "bg-primary hover:bg-slate-400 text-sm normal-case",
                footerActionText: "text-foreground",
                footerActionLink: " text-primary"
              },
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Page
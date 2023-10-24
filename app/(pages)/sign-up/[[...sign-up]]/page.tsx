import { SignUp } from "@clerk/nextjs";

const Page = async () => {

  return (
    <main
      className="flex flex-col h-screen items-center justify-center -mt-16 mx-auto w-screen px-40 bg-[rgb(186,189,244)] bg-[linear-gradient(135deg,rgba(186,189,244,1)0%,rgba(178,158,228,1)25%,rgba(229,150,225,1)50%,rgba(172,130,200,1)75%,rgba(216,131,187,1)100%)]"
    >
    <section className='py-24'>
      <div className='w-full'>
        <div className='flex justify-center'>
          <SignUp
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
    </main>
  )
}

export default Page
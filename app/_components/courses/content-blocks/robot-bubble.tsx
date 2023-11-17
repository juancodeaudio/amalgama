import { Image } from "@nextui-org/image"

type RobotBubbleProps = {
  children: React.ReactNode,
  isInverted?: boolean,
  title?: string,
  isWide?: boolean
}

const RobotBubble = ({children, isInverted = false, title, isWide = false}: RobotBubbleProps) => {
  return (
    <div className={`flex justify-between items-center my-8 ${isInverted && "flex-row-reverse"}`}>
      <div className={`${isWide ? "w-2/5" : "w-1/2"} w-1/2 flex justify-center`}>
        <Image
          width={200}
          src="/cuterobots_2.png"
          alt="Imagen de curso"
        />
      </div>
      <div className={`${isWide ? "w-3/5" : "w-1/2"} text-center flex flex-col justify-center bg-secondary/20 py-2 rounded-lg text-foreground/70 px-6`}>
        { title && <span className="text-secondary text-center font-bold pb-0 mt-6">{title}</span>}
        {children}
      </div>
    </div>
  )
}

export default RobotBubble
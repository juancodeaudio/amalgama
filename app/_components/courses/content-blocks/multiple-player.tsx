import PlayButton from "./play-button"

type MultiplePlayerProps = {
  audios: Array<{
    title: string,
    file: string,
    fileName: string
  }>
}

const MultiplePlayer = ({ audios }: MultiplePlayerProps) => {
  return (
    <div className="flex justify-evenly gap-2 bg-background rounded-xl p-3 py-6">
      {
        audios.map((audio, index) => (
          <div key={index} className="flex flex-col justify-center gap-3">
            <h4 className="my-0 text-center text-foreground">{audio.title}</h4>
            <PlayButton file={audio.file} fileName={audio.fileName}/>
          </div>
        ))
      }
    </div>
  )
}

export default MultiplePlayer
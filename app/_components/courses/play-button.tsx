import { useState } from 'react'

import { Link } from "@nextui-org/link";

import useSound from 'use-sound';
import { Button, ButtonGroup } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { HiPlay, HiPause, HiMiniArrowDownTray } from "react-icons/hi2";

type PlayButtonProps = {
  file: string;
  fileName: string;
}

export const PlayButton = ({file, fileName}: PlayButtonProps) => {
  const [play, { stop, duration }] = useSound(file);
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const playAudio = () => {
    play()
    setIsPlaying(true)
    console.log('Duration: ',duration)
    if(duration) {
      // a setInterval to update the progress bar according to the duration of the audio
      const interval = setInterval(() => {
        setProgress((progress) => progress + 1)
      }, duration/100);
      const timer = setTimeout(() => {
        stop()
        setIsPlaying(false)
        clearInterval(interval)
        setProgress(0)
      }, duration);
      return () => clearTimeout(timer)
    }
  }
  const pauseAudio = () => {
    stop()
    setIsPlaying(false)
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      <Progress
      aria-label="audio progress"
      size="sm"
      value={progress}
      color="primary"
      className="max-w-md"
    />
      <ButtonGroup>
        <Button size="sm" isDisabled={isPlaying} isIconOnly onPress={playAudio}><HiPlay className="h-5 w-5 text-primary"/></Button>
        <Button size="sm" isDisabled={!isPlaying} isIconOnly onPress={pauseAudio}><HiPause className="h-5 w-5 text-primary"/></Button>
        <Button as={Link} href={file} download={fileName} size="sm" isIconOnly><HiMiniArrowDownTray className="h-5 w-5 text-foreground/60" /></Button>
      </ButtonGroup>
    </div>
  )
}

export default PlayButton
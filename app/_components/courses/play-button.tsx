import { useState } from 'react'
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { HiPlay, HiPause, HiMiniArrowDownTray } from "react-icons/hi2";
import useSound from 'use-sound';

type PlayButtonProps = {
  file: string;
  fileName: string;
}

export const PlayButton = ({file, fileName}: PlayButtonProps) => {
  const [play, { stop, duration }] = useSound(file);
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = () => {
    play()
    setIsPlaying(true)
    console.log('Duration: ',duration)
    if(duration) {
      const timer = setTimeout(() => {
        stop()
        setIsPlaying(false)
      }, duration);
      return () => clearTimeout(timer);
    }
  }
  const pauseAudio = () => {
    stop()
    setIsPlaying(false)
  }

  return (
    <ButtonGroup>
      <Button size="sm" isDisabled={isPlaying} isIconOnly onPress={playAudio}><HiPlay className="h-5 w-5 text-primary"/></Button>
      <Button size="sm" isDisabled={!isPlaying} isIconOnly onPress={pauseAudio}><HiPause className="h-5 w-5 text-primary"/></Button>
      <Button as={Link} href={file} download={fileName} size="sm" isIconOnly><HiMiniArrowDownTray className="h-5 w-5 text-foreground/60" /></Button>
    </ButtonGroup>
  )
}

export default PlayButton
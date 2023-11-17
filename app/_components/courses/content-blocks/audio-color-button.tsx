import { useState } from 'react'
import clsx from 'clsx';

import useSound from 'use-sound';
import { Button } from "@nextui-org/button";

type AudioColorButtonProps = {
  file: string,
  children: React.ReactNode,
  className?: string
}

const AudioColorButton = ({file, children, className}: AudioColorButtonProps) => {
  const [play, { stop, duration }] = useSound(file);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    play()
    setIsPlaying(true)
    if(duration) {
      const timer = setTimeout(() => {
        stop()
        setIsPlaying(false)
      }, duration);
      return () => clearTimeout(timer)
    }
  }

  return (
    <Button
      onPress={playAudio}
      isDisabled={isPlaying}
      isIconOnly
      className={clsx(
        "w-14 h-14 text-2xl font-bold",
        className
      )}
    >
      {children}
    </Button>
  )
}

export default AudioColorButton
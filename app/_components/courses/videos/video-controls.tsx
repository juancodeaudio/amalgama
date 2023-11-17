import { useState } from "react"

import { Button } from "@nextui-org/button"
import { motion as m } from "framer-motion"
import TimelineSlider from "./timeline-slider"
import VolumeSlider from "./volume-slider"
import { formatTime } from '@/utils/formatTime';

import { HiPlay, HiPause } from "react-icons/hi2"
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdPictureInPictureAlt, MdVolumeUp, MdVolumeDown, MdVolumeOff } from "react-icons/md";

type VideoControlsProps = {
  videoRef: React.RefObject<HTMLVideoElement>,
  videoContainerRef: React.RefObject<HTMLDivElement>,
  handlePlayPause: () => void,
  progressPosition: number,
  setProgressPosition: (value: number) => void,
  videoCurrentTime: number,
  videoDuration: number,
  variants: any,
  isPaused: boolean,
  isMiniMode: boolean,
  setIsMiniMode: (value: boolean) => void
}

const VideoControls = ({videoRef, videoContainerRef, handlePlayPause, progressPosition, setProgressPosition, videoCurrentTime, videoDuration, variants, isPaused, isMiniMode, setIsMiniMode}: VideoControlsProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const handleFullScreen = () => {
    if (videoContainerRef.current && document.fullscreenElement == null) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen()
      } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
        (videoContainerRef.current as any).webkitRequestFullscreen()
      } else if ((videoContainerRef.current as any).msRequestFullscreen) {
        (videoContainerRef.current as any).msRequestFullscreen()
      }
      setIsFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen()
      } 
      setIsFullScreen(false)
    }
  }
  const handleMiniMode = () => {
    if (!isMiniMode) {
      if (videoRef.current?.requestPictureInPicture) {
        videoRef.current.requestPictureInPicture()
      } else if ((videoRef.current as any).webkitRequestPictureInPicture) {
        (videoRef.current as any).webkitRequestPictureInPicture()
      } else if ((videoRef.current as any).msRequestPictureInPicture) {
        (videoRef.current as any).msRequestPictureInPicture()
      }
      setIsMiniMode(true)
    } else {
      if (document.exitPictureInPicture) {
        document.exitPictureInPicture()
      } else if ((document as any).webkitExitPictureInPicture) {
        (document as any).webkitExitPictureInPicture()
      } else if ((document as any).msExitPictureInPicture) {
        (document as any).msExitPictureInPicture()
      } 
      setIsMiniMode(false)
    }
  }
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setVolume(isMuted ? videoRef.current.volume * 100 : 0);
      setIsMuted(!isMuted);
    }
  }
  const getVolumeIcon = () => {
    if (videoRef.current) {
      if (videoRef.current.volume === 0 || videoRef.current.muted) {
        return <MdVolumeOff className="h-6 w-6" />
      } else if ((videoRef.current.volume > 0 && videoRef.current.volume < 0.5) || videoRef.current.muted) {
        return <MdVolumeDown className="h-6 w-6" />
      } else {
        return <MdVolumeUp className="h-6 w-6" />
      }
    }
    return null
  }
  const handlePlaybackRate = () => {
    if (videoRef.current) {
      let newPlaybackRate = playbackRate + 0.25;
      if (newPlaybackRate > 2) {
        newPlaybackRate = 0.25;
      }
      setPlaybackRate(newPlaybackRate);
      videoRef.current.playbackRate = newPlaybackRate;
    }
  }
  
  return (
    <m.div
      className="absolute bottom-0 left-0 right-0 z-[100] items-center py-1 px-2 before:absolute before:bottom-0 before:left-0 before:-z-[1] before:h-full before:w-full before:bg-gradient-to-t before:from-background/90 before:via-background/50 before:via-60% before:to-transparent"
      style={{ opacity: isPaused ? 1 : 0 }}
      whileFocus={{ opacity: 1 }}
      variants={variants}
    >
      <TimelineSlider
        progressPosition={progressPosition}
        videoDuration={videoDuration}
        setProgressPosition={setProgressPosition}
        videoRef={videoRef}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">  
          <Button
            startContent={isPaused ? <HiPlay className="h-6 w-6" /> : <HiPause className="h-6 w-6" />}
            isIconOnly
            radius="full"
            variant="light"
            onPress={handlePlayPause}
          />
          <div
            className="flex items-center gap-2 group transition-colors hover:bg-background/70 rounded-full pr-0 hover:pr-4 focus-within:bg-background/70 focus-within:pr-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              startContent={getVolumeIcon()}
              isIconOnly
              radius="full"
              variant="light"
              onPress={handleMute}
            />
            <VolumeSlider
              value={[volume]}
              onValueChange={(value) => {
                if (videoRef.current) {
                  videoRef.current.volume = value[0] / 100
                  setVolume(value[0])
                }
              }}
            />
          </div>
          <p className="flex items-center text-small">{formatTime(videoCurrentTime)} / {formatTime(videoDuration)}</p>
        </div>
        <div className="flex items-center">
          <Button variant="light" onPress={handlePlaybackRate} isIconOnly radius="full">
            {playbackRate}x
          </Button>
          <Button
            startContent={<MdPictureInPictureAlt className="h-6 w-6" />}
            isIconOnly
            radius="full"
            variant="light"
            onPress={handleMiniMode}
          />
          <Button
            startContent={isFullScreen ? <MdOutlineFullscreenExit className="h-6 w-6" /> : <MdOutlineFullscreen className="h-6 w-6" />}
            isIconOnly
            radius="full"
            variant="light"
            onPress={handleFullScreen}
          />
        </div>
      </div>
    </m.div>
  )
}

export default VideoControls
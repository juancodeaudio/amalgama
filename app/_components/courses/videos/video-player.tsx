import { useState, useRef, useEffect } from "react"

import VideoControls from "./video-controls"
import { motion as m } from "framer-motion"

type VideoPlayerProps = {
  videoUrl: string
}

const VideoPlayer = ({videoUrl}: VideoPlayerProps) => {
  const [isPaused, setIsPaused] = useState(true)
  const [isMiniMode, setIsMiniMode] = useState(false)
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [progressPosition, setProgressPosition] = useState<number>(100);
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setIsPaused(false)
        videoRef.current.play()
      } else {
        setIsPaused(true)
        videoRef.current.pause()
      }
    }
  }
  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  }
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgressPosition(100 - percent);
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('enterpictureinpicture', () => {
        setIsMiniMode(true)
      })
      videoRef.current.addEventListener('leavepictureinpicture', () => {
        setIsMiniMode(false)
      })
    }
  }, [videoRef])

  const container = {
    hover: { },
    initial: { },
  }
  const item = {
    hover: { opacity: 1 },
    initial: { opacity: 0 },
  }
  return (
    <m.div
      ref={videoContainerRef}
      className="w-full max-w-[1000px] flex justify-center relative"
      initial="initial"
      whileHover="hover"
      variants={container}
      onClick={handlePlayPause}
    >
      {
        videoUrl !== ""
        ? (
          <>
          <VideoControls
            videoRef={videoRef}
            videoContainerRef={videoContainerRef}
            handlePlayPause={handlePlayPause}
            progressPosition={progressPosition}
            setProgressPosition={setProgressPosition}
            videoCurrentTime={videoCurrentTime}
            videoDuration={videoDuration}
            variants={item}
            isPaused={isPaused}
            isMiniMode={isMiniMode}
            setIsMiniMode={setIsMiniMode}
          />
          <video
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            ref={videoRef}
            className="rounded-lg w-full"
            src={videoUrl}
          />
          </>
        )
        : (
          <div className="w-full h-[60vh] bg-foreground/10 rounded-lg flex flex-col items-center justify-center">
            <p className="text-foreground/40 uppercase text-3xl">¡Ups!</p>
            <p className="text-foreground/40 text-xl">Aún estamos trabajando en este contenido...</p>
          </div>
        )
      }
      
    </m.div>
  )
}

export default VideoPlayer
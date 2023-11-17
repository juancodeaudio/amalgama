import { useState, useRef, useEffect } from 'react';
import { formatTime } from '@/utils/formatTime';

type TimelineSliderProps = {
  progressPosition: number,
  setProgressPosition: (value: number) => void,
  videoDuration: number,
  videoRef: React.RefObject<HTMLVideoElement>
}

const TimelineSlider = ({progressPosition, setProgressPosition, videoDuration, videoRef}: TimelineSliderProps) => {
  const [previewPosition, setPreviewPosition] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [wasPaused, setWasPaused] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null)

  const onSeeking = (e: any) => {
    if (timelineRef.current && videoRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width * 100;
      setIsSeeking((e.buttons & 1) === 1);
      console.log(videoRef.current.paused)
      if (isSeeking) {
        setWasPaused(videoRef.current.paused);
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = (percent / 100) * videoDuration;
        if (!wasPaused) {
          videoRef.current.play();
        }
      }
      onMouseMove(e);
    }
  }

  const onMouseMove = (e: any) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width * 100;
      const time = (percent / 100) * videoDuration;
      setPreviewPosition(100 - percent);
      setPreviewTime(time);
      if (isSeeking) {
        e.preventDefault();
        setProgressPosition(100 - percent);
      }
    }
  }

  return (
    <div
      ref={timelineRef}
      className="h-[20px] cursor-pointer flex items-end group mb-1"
      onClick={(e) => e.stopPropagation()}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseDown={(e) => onSeeking(e)}
      onMouseUp={(e) => {
        if (isSeeking) onSeeking(e)
      }}
    >
      <div
        className="bg-foreground/40 h-[3px] w-full relative rounded-full group-hover:h-[6px] transition-[height]"
      >
        <div
          className="absolute bottom-0 left-0 top-0 bg-foreground/70 rounded-full opacity-0 group-hover:opacity-100"
          style={{ right: `${previewPosition}%` }}
        />
        <div
          className='absolute -top-9 text-sm translate-x-[50%] bg-background/80 px-2 text-center rounded-full opacity-0 translate-y-6 scale-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-transform delay-150'
          style={{ right: `${previewPosition}%` }}
        >{formatTime(previewTime)}</div>
        <div
          className="absolute bottom-0 left-0 top-0 right-[60%] bg-secondary rounded-full"
          style={{ right: `${progressPosition}%` }}
        />
        <div
          className="scale-0 absolute translate-x-[50%] h-[250%] top-[-75%] bg-secondary rounded-full aspect-square group-hover:scale-100"
          style={{ right: `${progressPosition}%` }}
        />
      </div>
    </div>
  )
}

export default TimelineSlider
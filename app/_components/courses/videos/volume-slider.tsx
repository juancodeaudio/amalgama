import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';

type VolumeSliderProps = {
  onValueChange: (value: number[]) => void,
  className?: string,
  value: number[]
}

const VolumeSlider = ({onValueChange, className, value}: VolumeSliderProps) => (
  <form className={clsx(
    className,
    'w-0 opacity-0 transition-[width] duration-200 ease-in-out origin-left group-hover:w-16 group-hover:opacity-100 focus-within:w-16 focus-within:opacity-100'
    )}>
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      defaultValue={[100]}
      max={100}
      step={1}
      value={value}
      onValueChange={onValueChange}
    >
      <Slider.Track className="bg-foreground/40 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-foreground rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-4 h-4 bg-foreground cursor-pointer rounded-[10px] hover:bg-violet3 focus:outline-none"
        aria-label="Volume"
      />
    </Slider.Root>
  </form>
);

export default VolumeSlider;
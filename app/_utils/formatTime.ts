const leadingZero = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
})

export const formatTime = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  if (hours === 0) {
    return `${leadingZero.format(minutes)}:${leadingZero.format(seconds)}`;
  } else {
    return `${leadingZero.format(hours)}:${leadingZero.format(minutes)}:${leadingZero.format(seconds)}`;
  }
}
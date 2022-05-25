export const play = (src: string) => {
  let audio = new Audio(src);
  audio.load();
  audio.play();
  return audio;
};

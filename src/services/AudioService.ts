export const play = (src: string) => {
  let audio = new Audio();
  audio.src = src;
  audio.load();
  audio.play();
};

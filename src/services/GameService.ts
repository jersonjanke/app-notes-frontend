import { allNote, notes } from 'utils/notes';

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateLevel = (level: number) => {
  if (level === 0) level = 1;

  const random = Array.from(Array(level + 2).keys());
  const randomIndex = [];
  let i = random.length;
  let j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    randomIndex.push(random[j]);
    random.splice(j, 1);
  }

  return randomIndex.map((i) => allNote[i * 3]);
};

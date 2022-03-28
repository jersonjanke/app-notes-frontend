import { notes } from 'utils/notes';

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getLevelUnison = () => {
  return [
    {
      level: 1,
      notes: [notes.E0, notes.E3],
    },
    {
      level: 2,
      notes: [notes.E0, notes.E5],
    },
    {
      level: 3,
      notes: [notes.E0, notes.E8],
    },
    {
      level: 4,
      notes: [notes.E0, notes.E9],
    },
    {
      level: 5,
      notes: [notes.E0, notes.E5, notes.E10],
    },
  ];
};

const levelData = [
  {
    title: 'Fase 1',
    level: [
      {
        level: 1,
        size: 2,
        notes: [notes.E0, notes.E3],
      },
      {
        level: 2,
        size: 2,
        notes: [notes.E0, notes.E5],
      },
      {
        level: 3,
        size: 2,
        notes: [notes.E0, notes.E8],
      },
      {
        level: 4,
        size: 2,
        notes: [notes.E0, notes.E10],
      },
      {
        level: 5,
        size: 3,
        notes: [notes.E0, notes.E5, notes.E10],
      },
    ],
  },
  {
    title: 'Fase 2',
    level: [
      {
        level: 1,
        size: 2,
        notes: [notes.E0, notes.A2],
      },
      {
        level: 2,
        size: 2,
        notes: [notes.E5, notes.A3],
      },
      {
        level: 3,
        size: 3,
        notes: [notes.E7, notes.A10, notes.A12],
      },
      {
        level: 4,
        size: 3,
        notes: [notes.E0, notes.E10, notes.A3],
      },
      {
        level: 5,
        size: 3,
        notes: [notes.A5, notes.E5, notes.A8],
      },
    ],
  },
];

export const getLevel = (level: number) => {
  return levelData[level - 1];
};

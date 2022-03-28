import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Stepper from '@/components/Stepper';
import Title from '@/components/Title';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLevel } from 'services/GameService';
import { getRandomNumber } from 'services/GameService';
import { Note } from 'types/Game';
import { toast } from 'react-toastify';
import { pages } from 'utils/pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { play } from 'services/AudioService';

const LevelPage: React.FC = () => {
  const router = useRouter();
  const steps = [1, 2, 3, 4, 5];
  const { level } = router.query;
  const [active, setActive] = useState(0);
  const game = getLevel(Number(level));
  const [correct, setCorrect] = useState<Note | null>();

  useEffect(() => {
    if (game) {
      const note = setRandomNote(active);
      setCorrect(note);
      play(`/${note.src}`);
    }
  }, [game]);

  const setRandomNote = (activeLevel: number) => {
    return game.level[activeLevel].notes[
      getRandomNumber(game.level[activeLevel].size)
    ];
  };

  const handlePlay = () => {
    const randomNote = setRandomNote(active);
    setCorrect(randomNote);
    play(`/${randomNote.src}`);
  };

  const handleIsCorrect = (note: Note) => {
    const isCorrect = note === correct;
    if (isCorrect) {
      if (steps.length - 1 === active) {
        toast('Parabéns, você ganhou!!', {
          type: 'success',
          theme: 'colored',
        });
        return router.push(`/${pages.dashboard}`);
      }

      toast('Correto!', {
        type: 'success',
        theme: 'colored',
      });
      setActive(active + 1);
      const note = setRandomNote(active + 1);
      setCorrect(note);

      setTimeout(() => {
        play(`/${note.src}`);
      }, 500);
    } else {
      toast('Incorreto!', {
        type: 'error',
        theme: 'colored',
      });
    }
  };

  const handleRepeat = () => {
    correct && play(`/${correct.src}`);
  };

  return (
    <Flex flexDirection="column" gap="16px">
      {game && (
        <>
          <Title level={1}>{game.title}</Title>
          <Stepper items={steps} level={active + 1} />
          <Flex justifyContent="center" gap="8px">
            <Button onClick={handlePlay}>
              {'Tocar '}
              <FontAwesomeIcon icon={faPlay as IconProp} size="1x" />
            </Button>
            <Button onClick={handleRepeat}>
              {'Repetir '}
              <FontAwesomeIcon icon={faRetweet as IconProp} />
            </Button>
          </Flex>
          <Flex justifyContent="center" gap="8px">
            {game.level[active].notes.map((note) => (
              <Button
                disabled={!correct}
                onClick={() => handleIsCorrect(note)}
                key={note.name}
              >{`${note.name} (${note.cipher})`}</Button>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default LevelPage;

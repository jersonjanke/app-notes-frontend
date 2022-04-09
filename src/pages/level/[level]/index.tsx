import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Stepper from '@/components/Stepper';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { generateLevel } from 'services/GameService';
import { getRandomNumber } from 'services/GameService';
import { Note } from 'types/Game';
import { toast } from 'react-toastify';
import { pages } from 'utils/pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { play } from 'services/AudioService';
import ButtonCircle from '@/components/ButtonCircle';
import scoreService from 'services/ScoreService';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';

const LevelPage: React.FC = () => {
  const LIFE = 5;
  const steps = [1, 2, 3, 4, 5];
  const router = useRouter();
  const { level } = router.query;
  const user = useSelector((state: StoreData) => state.user);
  const [life, setLife] = useState(LIFE);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(0);
  const [correct, setCorrect] = useState<Note | null>();
  const [data, setData] = useState<Note[]>();
  const [disabled, setDisabled] = useState(true);

  const createScore = useCallback(() => {
    try {
      const payload = {
        email: user.email,
        life: LIFE,
        score: score,
      };
      scoreService.createScore(payload);
    } catch (error) {
      toast(`Problema ao criar o jogo: ${error}`, {
        type: 'error',
        theme: 'colored',
      });
    }
  }, []);

  useEffect(() => {
    createScore();
  }, [createScore]);

  useEffect(() => {
    setData(generateLevel(Number(level)));
  }, [level]);

  useEffect(() => {
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
    }
  }, [data]);

  const setRandomNote = (notes: Note[]) => {
    return getRandomNumber(notes ? notes?.length : 0);
  };

  const handlePlay = () => {
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
      play(`/${note.src}`);
      setDisabled(false);
    }
  };

  const handleIsCorrect = (note: Note) => {
    setDisabled(true);
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

      if (data) {
        const randomData = generateLevel(Number(level));
        setData(randomData);
        const random = setRandomNote(randomData);
        setCorrect(data[random]);
      }
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
      <>
        <Flex justifyContent="space-between">
          <Flex flexDirection="column">Level: {level}</Flex>
          <Flex justifyContent="center">Vidas: {life}</Flex>
          <Flex justifyContent="flex-end">Score: {score}</Flex>
        </Flex>

        <Stepper items={steps} level={active + 1} />

        <Flex
          justifyContent="center"
          gap="8px"
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          <ButtonCircle onClick={handlePlay}>
            <FontAwesomeIcon icon={faPlay as IconProp} size="3x" />
          </ButtonCircle>
          <ButtonCircle onClick={handleRepeat}>
            <FontAwesomeIcon icon={faRedoAlt as IconProp} size="3x" />
          </ButtonCircle>
        </Flex>
        <Flex justifyContent="center" gap="8px">
          {data &&
            data.map((note) => (
              <Button
                disabled={disabled}
                onClick={() => handleIsCorrect(note)}
                key={note.id}
              >{`${note.name} (${note.id})`}</Button>
            ))}
        </Flex>
      </>
    </Flex>
  );
};

export default LevelPage;

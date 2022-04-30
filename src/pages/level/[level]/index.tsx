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
import {
  faPlay,
  faRedoAlt,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { play } from 'services/AudioService';
import ButtonCircle from '@/components/ButtonCircle';
import ScoreService from 'services/ScoreService';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { GameListNotes, ScoreDto } from 'types/Score';
import Heart from '@/components/Heart';
import { primary } from 'utils/colors';

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
  const [dataScore, setDataScore] = useState<ScoreDto>();
  const [gameId, setGameId] = useState('');
  const [notes] = useState<GameListNotes[]>([]);

  const createScore = useCallback(async () => {
    try {
      const payload = {
        email: user.email,
        life: LIFE,
        score: score,
      };
      const response = await ScoreService.createScore(payload);
      response._id && setGameId(response._id);
      setDataScore(response);
    } catch (error) {
      toast(`Problema ao criar o jogo: ${error}`, {
        type: 'error',
        theme: 'colored',
      });
    }
  }, []);

  const updateScore = useCallback(
    async (life: number, score: number, done: boolean, data: ScoreDto) => {
      try {
        if (data) {
          const payload = {
            ...data,
            done,
            life,
            score,
            notes: notes,
            email: data.email,
          };
          data._id && setGameId(data._id);
          setScore(score);
          await ScoreService.updateScore(payload);
        }
      } catch (error) {
        toast(`Problema ao atualizar o score: ${error}`, {
          type: 'error',
          theme: 'colored',
        });
      }
    },
    []
  );

  useEffect(() => {
    createScore();
  }, [createScore]);

  useEffect(() => {
    level && setData(generateLevel(Number(level)));
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

  useEffect(() => {
    const updateGame = async (id: string) => {
      if (life === 0) {
        if (dataScore) {
          updateScore(dataScore?.life, dataScore?.score, true, dataScore);
        }

        return router.push(`/${pages.failed}/${id}`);
      }
    };
    updateGame(gameId);
  }, [life]);

  const handlePlay = () => {
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
      play(`/${note.src}`);
      setDisabled(false);
    }
  };

  const handleIsCorrect = async (note: Note) => {
    setDisabled(true);

    notes.push({
      level: active + 1,
      correct: correct ? correct?.name : 'null',
      selected: note.name,
    });

    const isCorrect = note === correct;
    if (isCorrect) {
      if (steps.length - 1 === active) {
        if (dataScore) {
          updateScore(dataScore?.life, dataScore?.score + 10, true, dataScore);
        }

        return router.push(`/${pages.success}/${gameId}`);
      }

      if (dataScore) {
        setDataScore({ ...dataScore, score: score + 10 });
      }

      toast('Correto!', {
        type: 'success',
        theme: 'colored',
      });

      setActive(active + 1);

      if (data) {
        const randomData = generateLevel(Number(level));
        if (randomData) {
          setData(randomData);
          const random = setRandomNote(randomData);
          setCorrect(data[random]);
        }
      }
    } else {
      if (dataScore) {
        setLife(life - 1);
        setDataScore({ ...dataScore, life: life - 1 });
      }
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
          <Flex>
            <FontAwesomeIcon
              size="2x"
              color={primary}
              style={{ cursor: 'pointer' }}
              icon={faArrowAltCircleLeft as IconProp}
              onClick={() => router.push(`/${pages.dashboard}`)}
            />
          </Flex>

          <Flex
            style={{ fontSize: 22, color: primary, textAlign: 'center' }}
            flexDirection="column"
          >
            Level: {level}
          </Flex>

          <Flex
            style={{ fontSize: 22, color: primary }}
            justifyContent="flex-end"
          >
            Score: {score}
          </Flex>
        </Flex>

        <Heart size={5} opacity={life} />
        <Stepper items={steps} level={active + 1} />

        <Flex
          justifyContent="center"
          gap="8px"
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          <ButtonCircle onClick={handlePlay}>
            <Flex justifyContent="center" style={{ marginLeft: 2 }}>
              <FontAwesomeIcon icon={faPlay as IconProp} size="2x" />
            </Flex>
          </ButtonCircle>
          <ButtonCircle onClick={handleRepeat}>
            <FontAwesomeIcon icon={faRedoAlt as IconProp} size="2x" />
          </ButtonCircle>
        </Flex>
        <Flex justifyContent="center" gap="8px" flexWrap="wrap">
          {data &&
            data.map((note) => (
              <Button
                style={{ width: 86, height: 36, fontSize: 14 }}
                disabled={disabled}
                onClick={async () => await handleIsCorrect(note)}
                key={note.id}
              >{`${note.name} (${note.id})`}</Button>
            ))}
        </Flex>
      </>
    </Flex>
  );
};

export default LevelPage;

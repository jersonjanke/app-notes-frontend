import {
  faPlay,
  faRedoAlt,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
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
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { play } from 'services/AudioService';
import ButtonCircle from '@/components/ButtonCircle';
import ScoreService from 'services/ScoreService';
import { GameListNotes, ScoreDto } from 'types/Score';
import Heart from '@/components/Heart';
import { primary } from 'utils/colors';
import MicrophoneStream from 'microphone-stream';
import { MicrophoneProps } from 'utils/microphone';
import Pitchfinder from 'pitchfinder';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import Config from '@/components/Config/Config';
import { ConfigData } from 'types/Config';

const LevelPage: React.FC = () => {
  const LIFE = 5;
  const MARGIN_HZ = 4;
  const SCORE = 10;
  const steps = [1, 2, 3, 4, 5];
  const router = useRouter();
  const [id] = useState(router?.query?.id);
  const { level } = router.query;
  const [life, setLife] = useState(LIFE);
  const [active, setActive] = useState(0);
  const [correct, setCorrect] = useState<Note | null>();
  const [data, setData] = useState<Note[]>();
  const [disabled, setDisabled] = useState(true);
  const [notes] = useState<GameListNotes[]>([]);
  const [frequency, setFrequency] = useState<number | null>(0);
  const [validateAudio, setValidateAudio] = useState(false);
  const MicroStream = new MicrophoneStream() as unknown as MicrophoneProps;
  const user = useSelector((state: StoreData) => state.user);
  const config = useSelector((state: ConfigData) => state.config);
  const [dataScore, setDataScore] = useState<ScoreDto>({
    done: false,
    email: user.email,
    life: LIFE,
    score: 0,
    notes: [],
  });

  const updateScore = useCallback(
    async (life: number, score: number, done: boolean, data: ScoreDto) => {
      try {
        if (data) {
          const payload = {
            ...data,
            _id: id ? (id as string) : '',
            done,
            life,
            score,
            notes: notes,
            email: data.email,
          };
          debugger;
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
    validateAudio && handleCorrectByHz();
  }, [validateAudio]);

  useEffect(() => {
    if (steps.length === active) {
      if (dataScore) {
        updateScore(
          dataScore?.life,
          dataScore?.score + SCORE,
          true,
          dataScore
        ).then(() => {
          return router.push(`/${pages.success}/${id}`);
        });
      }
    }
    if (level) {
      const randomData = generateLevel(Number(level));
      if (randomData) {
        setData(randomData);
        const random = setRandomNote(randomData);
        setCorrect(randomData[random]);
      }
    }
  }, [level, active]);

  useEffect(() => {
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
    }
  }, [data]);

  useEffect(() => {
    const updateGame = async (id: string) => {
      if (life === 0) {
        if (dataScore) {
          updateScore(dataScore?.life, dataScore?.score, true, dataScore).then(
            () => {
              return router.push(`/${pages.failed}/${id}`);
            }
          );
        }
      }
    };
    id && updateGame(id as string);
  }, [life, active]);

  const setRandomNote = (notes: Note[]) => {
    return getRandomNumber(notes ? notes?.length : 0);
  };

  const analyzeFrequency = () => {
    setTimeout(() => {
      setValidateAudio(false);
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          MicroStream.setStream(stream);
        });

      MicroStream.on('data', (chunk: any) => {
        const detectPitch = Pitchfinder.AMDF({
          minFrequency: 60,
          maxFrequency: 700,
          ratio: 10,
        });
        const stream = detectPitch(MicrophoneStream.toRaw(chunk));

        if (stream) {
          const hz = Number(stream) * 0.089 + Number(stream);
          setFrequency(hz);
        }
      });

      setTimeout(() => {
        MicroStream.stop();
        setValidateAudio(true);
      }, 3000);
    }, 1500);
  };

  const handlePlay = () => {
    config.microphone && analyzeFrequency();
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
      play(`/${note.src}`);
      setDisabled(false);
    }
  };

  const handleCorrectByHz = () => {
    notes.push({
      level: active + 1,
      correct: correct ? correct?.name : 'null',
      selected:
        data && frequency
          ? data.find(
              (note) =>
                frequency >= note.frequency - MARGIN_HZ &&
                frequency <= note.frequency + MARGIN_HZ
            )?.name || ''
          : '',
    });

    if (correct && frequency) {
      if (
        frequency >= correct?.frequency - MARGIN_HZ &&
        frequency <= correct.frequency + MARGIN_HZ
      ) {
        if (dataScore) {
          setDataScore({ ...dataScore, score: dataScore.score + SCORE });
        }

        toast('Correto!', {
          type: 'success',
          theme: 'colored',
        });

        setActive(active + 1);
      } else {
        if (dataScore) {
          setDataScore({ ...dataScore, life: life - 1 });
          setLife(life - 1);
        }
        toast('Incorreto!', {
          type: 'error',
          theme: 'colored',
        });
      }
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
      if (dataScore) {
        setDataScore({ ...dataScore, score: dataScore.score + SCORE });
      }
      toast('Correto!', {
        type: 'success',
        theme: 'colored',
      });
      setActive(active + 1);
    } else {
      if (dataScore) {
        setDataScore({ ...dataScore, life: life - 1 });
        setLife(life - 1);
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
            Score: {dataScore?.score}
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
      <Config />
    </Flex>
  );
};

export default LevelPage;

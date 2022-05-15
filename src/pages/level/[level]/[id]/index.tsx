import {
  faPlay,
  faRedoAlt,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { generateLevel } from 'services/GameService';
import { getRandomNumber } from 'services/GameService';
import { Note } from 'types/Game';
import { pages } from 'utils/pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { play } from 'services/AudioService';
import { ScoreDto } from 'types/Score';
import { primary } from 'utils/colors';
import { MicrophoneProps } from 'utils/microphone';
import { useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { ConfigData } from 'types/Config';
import { toastMSG } from 'utils/toast';
import { allNote } from 'utils/notes';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import ButtonCircle from '@/components/ButtonCircle';
import ScoreService from 'services/ScoreService';
import Heart from '@/components/Heart';
import MicrophoneStream from 'microphone-stream';
import Pitchfinder from 'pitchfinder';

const LevelPage: React.FC = () => {
  const LIFE = 5;
  const MARGIN_HZ = 4;
  const SCORE = 10;
  const steps = [1, 2, 3, 4, 5];
  const router = useRouter();
  const { id } = router.query;
  const { level } = router.query;
  const [active, setActive] = useState(0);
  const [record, setRecord] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [correct, setCorrect] = useState<Note | null>();
  const [data, setData] = useState<Note[]>();
  const [disabled, setDisabled] = useState(true);
  const user = useSelector((state: StoreData) => state.user);
  const config = useSelector((state: ConfigData) => state.config);
  const [dataScore, setDataScore] = useState<ScoreDto>({
    _id: '',
    done: false,
    email: user.email,
    life: LIFE,
    score: 0,
    notes: [],
  });

  const updateScore = useCallback(async (data: ScoreDto) => {
    try {
      await ScoreService.updateScore({
        ...data,
        _id: id as string,
        done: data.done,
        life: data.life,
        score: data.score,
        notes: dataScore.notes,
        email: data.email,
      });
    } catch (error) {
      toastMSG(`Problema ao atualizar o score: ${error}`, 'error');
    }
  }, []);

  useEffect(() => {
    if (steps.length === active) {
      updateScore(dataScore).then(() => {
        return router.push(`/${pages.success}/${id}`);
      });
    }
    const randomData = generateLevel(Number(level));
    setData(randomData);
    const random = setRandomNote(randomData);
    setCorrect(randomData[random]);
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
      if (dataScore.life === 0) {
        updateScore(dataScore).then(() => {
          return router.push(`/${pages.failed}/${id}`);
        });
      }
    };
    id && updateGame(id as string);
  }, [dataScore.life, active]);

  const setRandomNote = (notes: Note[]) => {
    return getRandomNumber(notes ? notes?.length : 0);
  };

  const getFrequency = () => {
    setTimeout(() => {
      setRecord(true);
      const MicroStream = new MicrophoneStream() as unknown as MicrophoneProps;
      const frequencyData: number[] = [];
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          MicroStream.setStream(stream);
        });

      MicroStream.on('data', (chunk: Buffer) => {
        const detectPitch = Pitchfinder.AMDF({
          minFrequency: 60,
          maxFrequency: 700,
          ratio: 5,
        });
        const stream = detectPitch(MicrophoneStream.toRaw(chunk));

        if (stream) {
          frequencyData.push(Number(stream) * 0.089 + Number(stream));
          let averageHZ =
            frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;
          setFrequency(averageHZ);
        }
      });

      setTimeout(() => {
        MicroStream.stop();
        setRecord(false);
      }, 2500);
    }, 1000);
  };

  const handlePlay = () => {
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
      play(`/${note.src}`);
      setDisabled(false);
    }
    config.microphone && getFrequency();
  };

  const analyzeFrequency = () => {
    if (!correct) return;
    const notes = dataScore.notes;
    notes.push({
      level: active + 1,
      correct: correct.name,
      selected:
        allNote.find(
          (note) =>
            frequency >= note.frequency - MARGIN_HZ &&
            frequency <= note.frequency + MARGIN_HZ
        )?.name || '',
    });

    if (
      frequency >= correct.frequency - MARGIN_HZ &&
      frequency <= correct.frequency + MARGIN_HZ
    ) {
      setDataScore({ ...dataScore, score: dataScore.score + SCORE, notes });
      toastMSG('Correto!', 'success');
      setActive(active + 1);
    } else {
      setDataScore({ ...dataScore, life: dataScore.life - 1, notes });
      toastMSG('Incorreto!', 'error');
    }
  };

  useEffect(() => {
    if (!record && config.microphone) {
      analyzeFrequency();
    }
  }, [record]);

  const handleIsCorrect = async (note: Note) => {
    setDisabled(true);

    const notes = dataScore.notes;
    notes.push({
      level: active + 1,
      correct: correct ? correct?.name : 'null',
      selected: note.name,
    });

    const isCorrect = note === correct;
    if (isCorrect) {
      setDataScore({ ...dataScore, score: dataScore.score + SCORE, notes });
      toastMSG('Correto!', 'success');
      setActive(active + 1);
    } else {
      setDataScore({ ...dataScore, life: dataScore.life - 1, notes });
      toastMSG('Incorreto!', 'error');
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

        <Heart size={5} opacity={dataScore.life} />
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

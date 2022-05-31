import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { generateLevel } from 'services/GameService';
import { getRandomNumber } from 'services/GameService';
import { Note } from 'types/Game';
import { pages } from 'utils/pages';
import { play } from 'services/AudioService';
import { ScoreDto } from 'types/Score';
import { primary } from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { toastMSG } from 'utils/toast';
import { allNote } from 'utils/notes';
import { setProgress } from 'store/actions/progress';
import { NextPage } from 'next';
import Flex from '@/components/Flex';
import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import ButtonCircle from '@/components/ButtonCircle';
import ScoreService from 'services/ScoreService';
import Heart from '@/components/Heart';
import Microphone from '@/components/Microphone';
import { setFrequency } from 'store/actions/frequency';
import Loading from '@/components/Loading';
import Image from 'next/image';
import playIcon from '../../../../../public/icons/play.svg';
import rotateIcon from '../../../../../public/icons/rotate-cw.svg';
import arrowLeftCircle from '../../../../../public/icons/arrow-left-circle.svg';

const LevelPage: NextPage = () => {
  const LIFE = 5;
  const MARGIN_HZ = 1.5;
  const SCORE = 10;
  const steps = [1, 2, 3, 4, 5];
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const { id } = router.query;
  const { level } = router.query;
  const [active, setActive] = useState(0);
  const [microphone, setMicrophone] = useState(false);
  const [correct, setCorrect] = useState<Note | null>(null);
  const [data, setData] = useState<Note[]>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabledStart, setDisabledStart] = useState(false);
  const [dataScore, setDataScore] = useState<ScoreDto>({
    _id: '',
    done: false,
    email: state.user.email,
    life: LIFE,
    score: 0,
    notes: [],
  });

  const updateScore = useCallback(async (data: ScoreDto) => {
    try {
      setLoading(true);
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
      setLoading(false);
      toastMSG(`Problema ao atualizar o score: ${error}`, 'error');
    }
  }, []);

  useEffect(() => {
    if (!correct) return;
    if (steps.length === active) {
      setMicrophone(false);
      dispatch(setProgress(0));
      updateScore(dataScore).then(() => {
        return router.push(
          `/${pages.finished}/${id}?level=${level}&success=${true}`
        );
      });
    }
    const randomData = generateLevel(Number(level));
    setData(randomData);
    const random = setRandomNote(randomData);
    setCorrect(randomData[random]);

    return () => {
      if (steps.length === active) setMicrophone(false);
    };
  }, [level, active]);

  useEffect(() => {
    const updateGame = async (id: string) => {
      if (dataScore.life === 0) {
        setMicrophone(false);
        dispatch(setProgress(0));
        updateScore(dataScore).then(() => {
          return router.push(
            `/${pages.finished}/${id}?level=${level}&success=${false}`
          );
        });
      }
    };
    id && updateGame(id as string);

    return () => {
      if (dataScore.life === 0) setMicrophone(false);
    };
  }, [dataScore.life, active]);

  useEffect(() => {
    if (!correct || !microphone) return;

    let selectedNote =
      allNote.find(
        (note) =>
          state.frequency.value >= note.frequency - MARGIN_HZ &&
          state.frequency.value <= note.frequency + MARGIN_HZ
      ) || null;

    if (selectedNote) {
      validateNote(selectedNote, correct);
    }
    return () => {
      selectedNote = null;
      setMicrophone(false);
      setDisabledStart(false);
      dispatch(setFrequency(-1));
    };
  }, [microphone, state.frequency.value]);

  const setRandomNote = (notes: Note[]) => {
    return getRandomNumber(notes ? notes?.length : 0);
  };

  const validateNote = (selectNote: Note, correctNote: Note) => {
    const notes = dataScore.notes;
    notes.push({
      level: active + 1,
      correct: correctNote ? correctNote?.name : 'null',
      selected: selectNote.name,
    });

    const isCorrect = selectNote.frequency === correctNote.frequency;
    if (isCorrect) {
      setDataScore({ ...dataScore, score: dataScore.score + SCORE, notes });
      toastMSG('Correto!', 'success');
      setActive(active + 1);
      dispatch(setFrequency(-1));
      setMicrophone(false);
    } else {
      setDataScore({ ...dataScore, life: dataScore.life - 1, notes });
      toastMSG('Incorreto!', 'error');
      dispatch(setFrequency(-1));
      setMicrophone(false);
    }
  };

  const playNote = () => {
    setMicrophone(false);
    if (data) {
      const random = setRandomNote(data);
      const note = data[random];
      setCorrect(note);
      const audio = play(note.src);
      state.config.microphone &&
        audio.addEventListener('ended', () => setMicrophone(true), false);
      setDisabled(false);
    } else {
      const randomData = generateLevel(Number(level));
      setData(randomData);
      const random = setRandomNote(randomData);
      const note = randomData[random];
      setCorrect(note);
      const audio = play(note.src);
      state.config.microphone &&
        audio.addEventListener('ended', () => setMicrophone(true), false);
      setDisabled(false);
    }

    setDisabledStart(true);
  };

  const handlePlay = async () => {
    setDisabledStart(true);
    state.config.microphone && setMicrophone(true);
    if (state.config.autoplay && correct) {
      setDisabledStart(true);
      const audio = play(correct.src);
      state.config.microphone &&
        audio.addEventListener('ended', () => setMicrophone(true), false);
    } else {
      playNote();
    }
  };

  const handleIsCorrect = async (note: Note, correctNote: Note) => {
    setDisabled(true);
    setDisabledStart(false);
    validateNote(note, correctNote);
  };

  const handleRepeat = () => {
    correct && play(correct.src);
  };

  return (
    <Flex flexDirection="column" gap="16px">
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Flex style={{ cursor: 'pointer' }}>
                <Image
                  src={arrowLeftCircle}
                  height={32}
                  width={32}
                  alt="back"
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
              <ButtonCircle onClick={handlePlay} disabled={disabledStart}>
                <Flex justifyContent="center" style={{ marginLeft: 2 }}>
                  <Image src={playIcon} height={28} width={28} alt="Play" />
                </Flex>
              </ButtonCircle>
              <ButtonCircle
                onClick={handleRepeat}
                disabled={!correct || state.config.microphone}
              >
                <Image src={rotateIcon} height={28} width={28} alt="Repeat" />
              </ButtonCircle>
            </Flex>

            <Flex justifyContent="center" gap="8px" flexWrap="wrap">
              {data &&
                data.map((note) => (
                  <Button
                    style={{ width: 86, height: 36, fontSize: 14 }}
                    disabled={disabled || state.config.microphone}
                    onClick={async () =>
                      correct && (await handleIsCorrect(note, correct))
                    }
                    key={note.id}
                  >{`${note.name} (${note.id})`}</Button>
                ))}
            </Flex>
            <Flex justifyContent="center" style={{ marginTop: 12 }}>
              <Microphone start={microphone} />
            </Flex>
          </>
        )}
      </>
    </Flex>
  );
};

export default LevelPage;

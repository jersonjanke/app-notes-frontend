import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import Image from 'next/image';
import { ScoreDto } from 'types/Score';
import { pages } from 'utils/pages';
import { primary } from 'utils/colors';
import { StoreData } from 'types/Login';
import { toastMSG } from 'utils/toast';
import { allNote } from 'utils/notes';
import { Note } from 'types/Game';
import { generateLevel } from 'services/GameService';
import { getRandomNumber } from 'services/GameService';
import { play } from 'services/AudioService';
import ScoreService from 'services/ScoreService';
import Flex from 'components/Flex';
import Button from 'components/Button';
import Stepper from 'components/Stepper';
import ButtonCircle from 'components/ButtonCircle';
import Heart from 'components/Heart';
import Microphone from 'components/Microphone';
import Loading from 'components/Loading';
import { setFrequency } from 'store/actions/frequency';
import Back from 'components/Back';

const LevelPage: NextPage = () => {
  const LIFE = 5;
  const MARGIN_HZ = 1.5;
  const SCORE = 10;
  const steps = [1, 2, 3, 4, 5];
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const { id, level } = router.query;
  const [active, setActive] = useState(0);
  const [microphone, setMicrophone] = useState(false);
  const [correct, setCorrect] = useState<Note | null>(null);
  const [data, setData] = useState<Note[]>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabledStart, setDisabledStart] = useState(false);
  const [dataScore, setDataScore] = useState<ScoreDto>({
    _id: '',
    level: Number(level),
    done: false,
    email: state.user.email,
    life: LIFE,
    score: 0,
    notes: [],
  });

  const updateScore = useCallback(
    async (data: ScoreDto) => {
      try {
        setLoading(true);
        await ScoreService.updateScore({
          ...data,
          _id: id as string,
        });
      } catch (error) {
        setLoading(false);
        toastMSG(`Problema ao atualizar o score: ${error}`, 'error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataScore?.notes, id]
  );

  useEffect(() => {
    if (!correct) return;
    if (steps.length === active) {
      setMicrophone(false);
      updateScore({ ...dataScore, done: true }).then(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, steps?.length]);

  const validateNote = useCallback(
    (selectNote: Note, correctNote: Note) => {
      const notes = dataScore.notes;
      notes.push({
        level: active + 1,
        correct: correctNote ? correctNote?.name : 'null',
        selected: selectNote.name,
      });

      const isCorrect = selectNote.name === correctNote.name;
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
    },
    [active, dataScore, dispatch]
  );

  useEffect(() => {
    const updateGame = async (id: string) => {
      if (dataScore.life === 0) {
        setMicrophone(false);
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
  }, [dataScore.life, active, dataScore, id, level, router, updateScore]);

  useEffect(() => {
    if (!correct || !microphone) return;

    let selectedNote =
      allNote.find((note) =>
        note.frequency.find(
          (hz) =>
            state.frequency.value >= hz - MARGIN_HZ &&
            state.frequency.value <= hz + MARGIN_HZ
        )
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.frequency.value]);

  const setRandomNote = (notes: Note[]) => {
    return getRandomNumber(notes ? notes?.length : 0);
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
    playNote();
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
            <Flex justifyContent="space-between" style={{ width: '100%' }}>
              <Back />

              <div style={{ fontSize: 22, color: primary }}>Level: {level}</div>

              <div style={{ fontSize: 22, color: primary }}>
                Score: {dataScore?.score}
              </div>
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
                  <Image
                    layout="fixed"
                    src="/svg/play.svg"
                    height={28}
                    width={28}
                    alt="Play"
                  />
                </Flex>
              </ButtonCircle>
              <ButtonCircle
                onClick={handleRepeat}
                disabled={!correct || state.config.microphone}
              >
                <Flex justifyContent="center">
                  <Image
                    layout="fixed"
                    src="/svg/rotate-cw.svg"
                    height={28}
                    width={28}
                    alt="Repeat"
                  />
                </Flex>
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

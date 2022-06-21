import { useCallback, useEffect, useState } from 'react';
import autoCorrelate from 'utils/AutoCorrelate';
import { setFrequency } from 'store/actions/frequency';
import { useDispatch, useSelector } from 'react-redux';
import { StoreData } from 'types/Login';
import { Wrapper } from './style';
import Flex from '../Flex';
import micIcon from '../../../public/svg/mic.svg';
import Image from 'next/image';

type Props = {
  start: boolean;
};

const Microphone: React.FC<Props> = ({ start }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: StoreData) => state);
  const [id, setId] = useState<NodeJS.Timeout>();
  const bufferLength = 2048;
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [buffer, setBuffer] = useState<Float32Array>();
  const [audio, setAudio] = useState<AudioContext>();
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>();
  const [input, setInput] = useState<MediaStream>();

  const updatePitch = useCallback(() => {
    if (!analyser || !buffer || !audio) return;

    analyser.getFloatTimeDomainData(buffer);
    var hz = autoCorrelate(buffer, audio.sampleRate);
    if (hz > -1) {
      dispatch(setFrequency(hz));
    }
  }, [analyser, audio, buffer, dispatch]);

  const startMicrophone = useCallback(async () => {
    if (!audio) return;
    const micInput = await getMicInput();
    setInput(micInput);

    if (audio.state === 'suspended') {
      await audio.resume();
    }
    setSource(audio.createMediaStreamSource(micInput));
    let loopID = setInterval(updatePitch, 200);
    setId(loopID);
  }, [audio, updatePitch]);

  const stopMicrophone = useCallback(() => {
    id && clearInterval(id);
    input?.getTracks().forEach((track) => track.stop());
    source?.mediaStream.getTracks().forEach((track) => track.stop());
  }, [id, input, source?.mediaStream]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudio(audioCtx);
      setAnalyser(audioCtx.createAnalyser());
      setBuffer(new Float32Array(bufferLength));
    }
  }, []);

  useEffect(() => {
    start ? startMicrophone() : stopMicrophone();

    return () => {
      stopMicrophone();
    };
  }, [start, startMicrophone, stopMicrophone]);

  useEffect(() => {
    if (source != undefined && analyser != undefined) {
      source?.connect(analyser);
    }

    return () => {
      stopMicrophone();
    };
  }, [source, analyser, stopMicrophone]);

  const getMicInput = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };

  return (
    <>
      {state.config.microphone && start && (
        <Flex justifyContent="center" flexDirection="column">
          <Flex style={{ width: '100%' }} justifyContent="center">
            <Image
              layout="fixed"
              src={micIcon}
              alt="Microphone"
              height={32}
              width={32}
            />
          </Flex>

          <Wrapper>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
          </Wrapper>
        </Flex>
      )}
    </>
  );
};

export default Microphone;

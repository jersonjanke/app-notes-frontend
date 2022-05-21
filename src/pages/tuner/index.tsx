import { NextPage } from 'next';
import autoCorrelate from 'utils/AutoCorrelate';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Flex from '@/components/Flex';

const TunerPage: NextPage = () => {
  const bufferLength = 2048;
  const [analyser, setAnalyser] = useState<AnalyserNode>();
  const [buffer, setBuffer] = useState<Float32Array>();
  const [audio, setAudio] = useState<AudioContext>();
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new (window.AudioContext || window.webkitAudioContext)();
      setAudio(audio);
      setAnalyser(audio.createAnalyser());
      setBuffer(new Float32Array(bufferLength));
    }
  }, []);

  const updatePitch = () => {
    if (!analyser || !buffer || !audio) return;
    analyser.getFloatTimeDomainData(buffer);
    var ac = autoCorrelate(buffer, audio.sampleRate);
    if (ac > -1) {
      console.log(ac);
    }
  };

  setInterval(updatePitch, 100);

  useEffect(() => {
    if (source != undefined && analyser != undefined) {
      source?.connect(analyser);
    }
  }, [source, analyser]);

  const start = async () => {
    if (!audio) return;
    const input = await getMicInput();

    if (audio.state === 'suspended') {
      await audio.resume();
    }
    setSource(audio.createMediaStreamSource(input));
  };

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

  const stop = () => {
    source?.mediaStream.getTracks().forEach((track) => track.stop());
  };

  return (
    <Flex flexDirection="row" gap="12px">
      <Button onClick={start}>Start</Button>
      <Button onClick={stop}>Stop</Button>
    </Flex>
  );
};

export default TunerPage;

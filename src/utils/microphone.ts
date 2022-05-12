export type MicrophoneProps = {
  on: (data: string, fn: (chunk: Buffer) => void) => void;
  pipe: () => void;
  toRaw: (chunk: Buffer) => void;
  setStream: (stream: MediaStream) => void;
  stop: () => void;
};

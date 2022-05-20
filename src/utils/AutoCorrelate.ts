const autoCorrelate = (buffer: Float32Array, sampleRate: number) => {
  var SIZE = buffer.length;
  var rms = 0;

  for (let i = 0; i < SIZE; i++) {
    var val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  var r1 = 0,
    r2 = SIZE - 1,
    thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++)
    if (Math.abs(buffer[i]) < thres) {
      r1 = i;
      break;
    }
  for (let i = 1; i < SIZE / 2; i++)
    if (Math.abs(buffer[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }

  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  var c = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i++)
    for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buffer[j] * buffer[j + i];

  var d = 0;
  while (c[d] > c[d + 1]) d++;
  var maxVal = -1,
    maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i];
      maxPos = i;
    }
  }
  var T0 = maxPos;

  var x1 = c[T0 - 1],
    x2 = c[T0],
    x3 = c[T0 + 1];
  var a = (x1 + x3 - 2 * x2) / 2;
  var b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
};

export default autoCorrelate;

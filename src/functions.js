const sum = (...nums) => nums.reduce((sum, num) => sum + num);
const avg = (...nums) => sum(...nums) / nums.length;

import { mapPlaneToSphere } from './math-lib';
import Queue from './queue';

export function createEmptyImgData(width, height, color = [0, 0, 0, 255]) {
  const newData = new ImageData(width, height);

  for (let i = 0; i < newData.data.length; i += 4) {
    newData.data[i] = color[0];
    newData.data[i + 1] = color[1];
    newData.data[i + 2] = color[2];
    newData.data[i + 3] = color[3];
  }

  return newData;
}

// delays color channels
// red stays at same speed, then green delays, then blue delays
export function createChannelDelayEffect(delay = 10 /* in frames */) {
  let currFrame = 0;
  const channelQueues = {
    g: new Queue(),
    b: new Queue()
  };

  return function(imgData) {
    const _currFrame = currFrame;
    currFrame += 1;

    // store current green and blue channel values
    const queuedGVals = _storeChannelValues(imgData, 1);
    const queuedBVals = _storeChannelValues(imgData, 2);

    channelQueues.g.add(queuedGVals);
    channelQueues.b.add(queuedBVals);

    const gVals =
      _currFrame < delay
        ? channelQueues.g.first.item
        : channelQueues.g.pop().item;
    const bVals =
      _currFrame < 2 * delay
        ? channelQueues.b.first.item
        : channelQueues.b.pop().item;

    _applyChannelValuesToImgData(imgData, gVals, 1);
    _applyChannelValuesToImgData(imgData, bVals, 2);

    return imgData;
  };
}

function _applyChannelValuesToImgData(imgData, values, idxOffset) {
  values.forEach((value, i) => {
    imgData.data[i * 4 + idxOffset] = value;
  });
}

function _storeChannelValues(imgData, idxOffset) {
  const values = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    values[i / 4] = imgData.data[i + idxOffset];
  }
  return values;
}

export function desaturate(imgData) {
  const len = imgData.data.length;

  for (let i = 0; i < len; i += 4) {
    const avgVal = avg(
      imgData.data[i],
      imgData.data[i + 1],
      imgData.data[i + 2]
    );
    imgData.data[i] = avgVal;
    imgData.data[i + 1] = avgVal;
    imgData.data[i + 2] = avgVal;
  }

  return imgData;
}

function inInnerCircle(pixelIdx, width, height) {
  const x = pixelIdx % width;
  const y = Math.floor(pixelIdx / height);

  const originX = width / 2;
  const originY = height / 2;
  const radius = height / 2;
  const xNorm = x - originX;
  const yNorm = y - originY;

  return Math.pow(xNorm, 2) + Math.pow(yNorm, 2) <= Math.pow(radius, 2);
}

const once = (() => {
  let run = false;
  return fn => {
    if (!run) {
      run = true;
      return fn();
    }
  };
})();

export function mcEscherBall(imgData, canvas) {
  const { width, height } = imgData;
  const newImgData = createEmptyImgData(width, height);

  // iterate by row
  for (let j = 0; j < height; j += 1) {
    // iterate by cell w/in row
    for (let i = 0; i < width; i += 1) {
      const { x, y } = mapPlaneToSphere({
        i,
        j,
        width,
        height
      });

      const cellIdx = j * width + i;
      const newCellIdx = y * width + x;

      newImgData.data[newCellIdx] = imgData.data[cellIdx];
      newImgData.data[newCellIdx + 1] = imgData.data[cellIdx + 1];
      newImgData.data[newCellIdx + 2] = imgData.data[cellIdx + 2];
      newImgData.data[newCellIdx + 3] = imgData.data[cellIdx + 3];
    }
  }

  return newImgData;
}

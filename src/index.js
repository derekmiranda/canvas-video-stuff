import {
  mcEscherBall,
  desaturate,
  createChannelDelayEffect
} from './functions';
import { createEmptyImgData } from './functions';

(() => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const channelDelay = createChannelDelayEffect();

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function redraw() {
    requestAnimationFrame(() => {
      if (video.HAVE_ENOUGH_DATA && !video.paused) {
        ctx.drawImage(video, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const newImgData = channelDelay(imgData, canvas);
        ctx.putImageData(newImgData, 0, 0);
      }
      window.requestAnimationFrame(redraw);
    });
  }

  // navigator.getUserMedia ||
  // navigator.webkitGetUserMedia ||
  // navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  if (!navigator.mediaDevices.getUserMedia) {
    window.alert(
      'Sorry. navigator.mediaDevices.getUserMedia() is not available.'
    );
  } else {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: canvas.width,
          height: canvas.height
        }
      })
      .then(gotStream)
      .catch(noStream);
  }

  function gotStream(stream) {
    video.srcObject = stream;

    setTimeout(() => {
      video.play();
    }, 0);
    redraw();

    video.onerror = function(e) {
      stream.stop();
    };
    stream.onended = noStream;
  }

  function noStream(e) {
    var msg = 'No camera available.';
    if (e.code == 1) {
      msg = 'User denied access to use camera.';
    }
    window.alert(msg);
  }

  canvas.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
  });
})();

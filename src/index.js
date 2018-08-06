(() => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function redraw() {
    requestAnimationFrame(() => {
      if (video.HAVE_ENOUGH_DATA && !video.paused) {
        ctx.drawImage(video, 0, 0);
      }
      window.requestAnimationFrame(redraw);
    });
  }

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  if (!navigator.getUserMedia) {
    window.alert('Sorry. navigator.getUserMedia() is not available.');
  } else {
    navigator.getUserMedia(
      { video: { width: 1280, height: 720 } },
      gotStream,
      noStream
    );
  }

  function gotStream(stream) {
    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    } // Opera
    else {
      video.src = stream;
    }

    video.play();
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

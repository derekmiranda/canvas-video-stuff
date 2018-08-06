(() => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  function redraw() {
    requestAnimationFrame(() => {
      ctx.drawImage(video, 0, 0);
      !video.paused && window.requestAnimationFrame(redraw);
    });
  }

  video.addEventListener('play', () => {
    window.requestAnimationFrame(redraw);
  });

  canvas.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
  });

  // setTimeout(() => video.play(), 0);
})();

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  video.addEventListener('playing', () => {
    console.log('playing');
    ctx.drawImage(video, 0, 0);
  });
});

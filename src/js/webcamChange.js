'use strict';
const mainCam = document.querySelector('.zoos__main-camera');
const camsContainer = document.querySelector('.zoos__cameras');

function onCamClick(evt) {
  const target = evt.target.closest('.slider__slide');
  if (!target) return;
  const cam = target.querySelector('iframe');
  [cam.src, mainCam.src] = [mainCam.src, cam.src];
  mainCam.playVideo();
}

camsContainer.addEventListener('click', onCamClick);
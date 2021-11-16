"use strict";

const PIPE_WIDTH = 120;
const HOLE_HEIGHT = 120;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.75;
let pipes = [];
let timeSinceLastPipe = 0;
let passedPipeCount;

const randomNumberBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createPipe = function () {
  const randomNumber = randomNumberBetween(
    HOLE_HEIGHT * 1.5,
    window.innerHeight - HOLE_HEIGHT * 0.5
  );
  const pipeHtml = `
  <div class="pipe"  style="--hole-top: ${randomNumber};">
    <div class="segment top"></div>
    <div class="segment bottom"></div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", pipeHtml);
  const pipeElem = document.body.lastElementChild;
  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      );
    },
    set left(value) {
      pipeElem.style.setProperty("--pipe-left", value);
    },
    remove() {
      pipes = pipes.filter((p) => pipe !== p);
      pipeElem.remove();
    },
  };
  pipe.left = window.innerWidth;
  pipes.push(pipe);
};

export const updatePipes = (delta) => {
  timeSinceLastPipe += delta;

  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL;
    createPipe();
  }

  pipes.forEach((pipe) => {
    if (pipe.left + PIPE_WIDTH < 0) {
      passedPipeCount++;
      return pipe.remove();
    }
    pipe.left = pipe.left - delta * PIPE_SPEED;
  });
};

export const setupPipes = () => {
  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT);
  pipes.forEach((pipe) => pipe.remove());
  timeSinceLastPipe = PIPE_INTERVAL;
  passedPipeCount = 0;
};

export const getPassedPipeCount = () => passedPipeCount;

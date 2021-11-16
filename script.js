"use strict";
import { updateBird, setupBird, getBirdRect } from "./bird.js";
import { updatePipes, setupPipes, getPassedPipeCount } from "./pipe.js";

const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
let lastTime;

const checkLose = () => {
  const birdRect = getBirdRect();
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outsideWorld;
};

const handleStart = function () {
  title.classList.add("hide");
  setupBird();
  setupPipes();
  lastTime = null;
  window.requestAnimationFrame(updateLoop);
};

const handleLose = function () {
  setTimeout(() => {
    title.classList.remove("hide");
    subtitle.textContent = `${getPassedPipeCount()} Pipes`;
    document.addEventListener("keypress", handleStart, { once: true });
  }, 250);
};

const updateLoop = function (time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  updateBird(delta);
  updatePipes(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
};

document.addEventListener("keypress", handleStart, { once: true });

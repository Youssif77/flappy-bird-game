"use strict";

const title = document.querySelector(".title");
let lastTime;
const updateLoop = function (time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
};

const handleStart = function () {
  title.classList.add("hide");
  window.requestAnimationFrame(updateLoop);
};
const handleLose = function () {};

document.addEventListener("keypress", handleStart, { once: true });

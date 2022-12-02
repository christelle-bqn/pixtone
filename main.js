import { models, notes } from "./pixelModels.js";

const BaseAudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new BaseAudioContext();

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const clearButton = document.getElementById("clearButton");
const playButton = document.getElementById("playButton");
const selectSoundType = document.getElementById("selectSound");
const selectPixelModel = document.getElementById("selectPixelModel");

let soundType = "sine";
let pixelModel = "";

let playing = false;

const paths = [];

const melody = [];

function generateModels(name) {
  const modelSelected = models.find((model) => model.name === name);

  if (!modelSelected) return;

  modelSelected.paths.map((model) => {
    paths.forEach((path, index) => {
      if (ctx.isPointInPath(path.path, model.x, model.y)) {
        ctx.fillStyle = model.color;
        ctx.fill(path.path);
        melody.push(path);
      }
    });
  });
}

function getNote(opt) {
  if (!opt) return;

  if (opt === "frequency") {
    return notes[Math.floor(Math.random() * notes.length)].frequency;
  }

  if (opt === "color") {
    return notes[Math.floor(Math.random() * notes.length)].color;
  }
}

function drawBoard() {
  const rows = 10;
  const cols = 10;
  const side = 30;
  const space = 1.5;
  canvas.width = cols * side * space + 10;
  canvas.height = rows * side * space + 10;

  let dy = -1;
  for (let i = 0; i < rows * cols; i++) {
    let dx = i % cols;
    dy += dx ? 0 : 1;
    dx += dy % 2 ? 0 : 0;
    let cx = dx * (side * space) + side / 1.3 + 5;
    let cy = dy * (side * space) + side / 1.3;

    let path = new Path2D();
    for (let j = 0; j < 4; j++) {
      let x = Math.cos((Math.PI / 2) * j + Math.PI / 4) * side + cx;
      let y = Math.sin((Math.PI / 2) * j + Math.PI / 4) * side + cy;

      if (j) {
        path.lineTo(x, y);
      } else {
        path.moveTo(x, y);
      }
    }
    path.closePath();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke(path);

    paths.push({
      path: path,
      frequency: getNote("frequency"),
      color: getNote("color"),
    });
  }
}

function playNote(freq) {
  return new Promise((resolve) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = soundType;
    oscillator.connect(gain);
    oscillator.frequency.value = freq;
    gain.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    oscillator.addEventListener("ended", resolve, { once: true });
  });
}

async function play(e) {
  for (const node of melody) {
    await playNote(node.frequency);
    playing = false;
    e.target.classList.remove("clicked");
  }
}

function stopPlay() {
  melody.length = 0;
}

function clearCanvas() {
  if (!melody.length) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
}

function init() {
  drawBoard();
}

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) throw new Error("unable to get app");

  init();

  canvas.addEventListener("click", (e) => {
    let bound = canvas.getBoundingClientRect();
    let x = e.pageX - bound.left;
    let y = e.pageY - bound.top;

    paths.forEach((path, index) => {
      if (ctx.isPointInPath(path.path, x, y)) {
        ctx.fillStyle = path.color;
        ctx.fill(path.path);
        melody.push(path);
      }
    });
  });

  clearButton.addEventListener("click", (e) => {
    e.target.classList.add("clicked");
    clearCanvas();
    stopPlay();
    pixelModel = "";
    selectPixelModel.value = "";
  });

  playButton.addEventListener("click", (e) => {
    if (!melody.length) return;

    e.target.classList.add("clicked");
    play(e);
  });

  selectSoundType.addEventListener("change", (e) => {
    soundType = e.target.value;
  });

  selectPixelModel.addEventListener("change", (e) => {
    pixelModel = e.target.value;

    clearCanvas();
    stopPlay();

    if (pixelModel.length === 0) return;
    generateModels(pixelModel);
  });
});

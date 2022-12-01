const BaseAudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new BaseAudioContext();

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const clearButton = document.getElementById("clearButton");
const playButton = document.getElementById("playButton");
const selectSoundType = document.getElementById("selectSound");

let soundType = "sine";

const paths = [];

const melody = [];

const notes = [
  {
    key: "B",
    frequency: 494,
    color: "#F3A0DC", //pink
  },

  {
    key: "A",
    frequency: 440,
    color: "#F9C577", //orange
  },
  {
    key: "G",
    frequency: 392,
    color: "#AA93E9", //purple
  },

  {
    key: "F",
    frequency: 349,
    color: "#A0E381", //green
  },
  {
    key: "E",
    frequency: 330,
    color: "#9FD8F8", //blue
  },

  {
    key: "D",
    frequency: 294,
    color: "#FBF67E", //yellow
  },

  {
    key: "C",
    frequency: 262,
    color: "#F87777", //red
  },
];

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
  const rows = 7;
  const cols = 14;
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
    ctx.strokeStyle = "#898884";
    ctx.stroke(path);

    paths.push({
      path: path,
      frequency: getNote("frequency"),
      color: getNote("color"),
    });
  }
}

let posX = 0;
let speed = 2;

function drawBar(posX = 0) {
  let path = new Path2D();

  path.moveTo(posX, 0);
  path.lineTo(posX, canvas.height);

  path.closePath();

  ctx.strokeStyle = "#2b2b2b";
  ctx.lineWidth = 5;
  ctx.lineCap = "butt";
  ctx.stroke(path);
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

async function play() {
  if (!melody.length) return;

  for (const node of melody) {
    await playNote(node.frequency);
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
  drawBar();
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
    clearCanvas();
    stopPlay();
  });

  playButton.addEventListener("click", (e) => {
    play();
  });

  selectSoundType.addEventListener("change", (e) => {
    soundType = e.target.value;
  });
});

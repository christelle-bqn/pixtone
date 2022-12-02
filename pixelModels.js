export const notes = [
  {
    key: "B",
    frequency: 494,
    color: "#DC69BC", //pink
  },

  {
    key: "A",
    frequency: 440,
    color: "#E8AE58", //orange
  },
  {
    key: "G",
    frequency: 392,
    color: "#866AD6", //purple
  },

  {
    key: "F",
    frequency: 349,
    color: "#7DD155", //green
  },
  {
    key: "E",
    frequency: 330,
    color: "#63B4FF", //blue
  },

  {
    key: "D",
    frequency: 294,
    color: "#FFF970", //yellow
  },

  {
    key: "C",
    frequency: 262,
    color: "#E45C5C", //red
  },
];

export const models = [
  {
    name: "heart",
    paths: [
      {
        x: 60,
        y: 150,
        frequency: notes[1].frequency,
        color: notes[1].color,
      },

      {
        x: 100,
        y: 130,
        frequency: notes[4].frequency,
        color: notes[4].color,
      },
      {
        x: 120,
        y: 140,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },
      {
        x: 130,
        y: 200,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },

      {
        x: 160,
        y: 170,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },
      {
        x: 150,
        y: 200,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },
      {
        x: 150,
        y: 230,
        frequency: notes[0].frequency,
        color: notes[0].color,
      },

      {
        x: 200,
        y: 130,
        frequency: notes[4].frequency,
        color: notes[4].color,
      },
      {
        x: 200,
        y: 170,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },
      {
        x: 200,
        y: 190,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },
      {
        x: 232,
        y: 140,
        frequency: notes[1].frequency,
        color: notes[1].color,
      },
    ],
  },

  {
    name: "note",
    paths: [
      {
        x: 60,
        y: 240,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },
      {
        x: 60,
        y: 280,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },
      {
        x: 100,
        y: 240,
        frequency: notes[0].frequency,
        color: notes[0].color,
      },

      {
        x: 100,
        y: 280,
        frequency: notes[4].frequency,
        color: notes[4].color,
      },

      {
        x: 150,
        y: 80,
        frequency: notes[4].frequency,
        color: notes[4].color,
      },
      {
        x: 150,
        y: 130,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },
      {
        x: 150,
        y: 170,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },

      {
        x: 180,
        y: 220,
        frequency: notes[1].frequency,
        color: notes[1].color,
      },

      {
        x: 180,
        y: 230,
        frequency: notes[2].frequency,
        color: notes[2].color,
      },

      {
        x: 200,
        y: 120,
        frequency: notes[6].frequency,
        color: notes[6].color,
      },

      {
        x: 240,
        y: 140,
        frequency: notes[1].frequency,
        color: notes[1].color,
      },
    ],
  },
];

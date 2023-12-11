const difficulties = [
  {
    label: "Easy",
    value: 20,
    color: "green",
  },
  {
    label: "Midium",
    value: 58,
    color: "orange",
  },
  {
    label: "Hard",
    value: 88,
    color: "red",
  },
];

const getDifficulty = (difficulty) => {
  if (!difficulty) return difficulties[0];

  if (difficulty < 40) return difficulties[0];
  else if (difficulty >= 40 && difficulty < 75) return difficulties[1];
  else return difficulties[2];
};

export { difficulties, getDifficulty };

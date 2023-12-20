export const questionOptions = ["A", "B", "C", "D", "E"];

export const questionInfoSectionStruct = {
  questionInfo: { vertical: true, gap: "middle" },
  question: {
    gap: "middle",
    justify: "space-between",
  },

  optionsStruct: {
    options: {
      vertical: true,
      gap: "middle",
    },

    optionStruct: {
      option: {
        align: "center",
        gap: "middle",
      },

      optionNo: {
        size: "small",
        shape: "circle",
      },
    },
  },

  metaSectionStruct: {
    metaSection: {
      gap: "middle",
      align: "center",
      justify: "flex-end",
      wrap: "wrap",
    },

    nameTag: { color: "default" },
    emailTag: { color: "processing" },
    subjectTag: { color: "processing" },

    creatorText: { type: "secondary" },
    dateText: { type: "secondary" },

    divider: {
      type: "vertical",
    },
  },
};

export const metaSectionStruct = {
  gap: "middle",
  align: "center",
  justify: "flex-end",
  wrap: "wrap",
};

//Trainer Subjects
//Subject
const initialState = {
  trainerSubjectsLoading: false,
  trainerSubjects: [],
};

const trainerSubjectAction = (state = initialState, action) => {
  switch (action.type) {
    case "TRAINER_SUBJECT":
      return {
        ...state,
        trainerSubjectsLoading: action.loading,
        trainerSubjects: action.data,
      };

    default:
      return state;
  }
};

export default trainerSubjectAction;

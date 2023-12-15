//Question
const initialState = {
  questionModalState: false,
  questionModalMode: "COMPLETE",
  questionId: null,
  questionDetails: null,
  questionsLoading: false,
  questions: [],
};

const questionAction = (state = initialState, action) => {
  switch (action.type) {
    case "QUESTION_MODIFY_ACTION":
      return {
        ...state,
        questionModalState: action.state,
        questionId: action.questionId,
        questionModalMode: action.mode,
        questionDetails: null,
      };

    case "QUESTION":
      return {
        ...state,
        questionDetails: action.details,
      };

    case "QUESTIONS":
      return {
        ...state,
        questionsLoading: action.loading,
        questions: action.data,
      };

    default:
      return state;
  }
};

export default questionAction;

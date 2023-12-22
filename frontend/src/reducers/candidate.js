//Candidates

const initialState = {
  candidatesLoading: false,
  candidates: [],
};

const candidateAction = (state = initialState, action) => {
  switch (action.type) {
    case "CANDIDATES":
      return {
        ...state,
        candidatesLoading: action.loading,
        candidates: action.data,
      };

    default:
      return state;
  }
};

export default candidateAction;

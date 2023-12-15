//Question
const initialState = {
  tagModalState: false,
  tagModalMode: "COMPLETE",
  tagId: null,
  tagDetails: null,
  tagsLoading: false,
  tags: [],
};

const tagAction = (state = initialState, action) => {
  switch (action.type) {
    case "TAG_MODIFY_ACTION":
      return {
        ...state,
        tagModalState: action.state,
        tagId: action.tagId,
        tagModalMode: action.mode,
        tagDetails: null,
      };

    case "TAG":
      return {
        ...state,
        tagDetails: action.details,
      };

    case "TAGS":
      return {
        ...state,
        tagsLoading: action.loading,
        tags: action.data,
      };

    default:
      return state;
  }
};

export default tagAction;

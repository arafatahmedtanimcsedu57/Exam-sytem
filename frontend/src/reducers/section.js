//section
const initialState = {
  sectionModalState: false,
  sectionModalMode: "COMPLETE",
  sectionId: null,
  sectionDetails: null,
  sectionsLoading: false,
  sections: [],
};

const sectionAction = (state = initialState, action) => {
  switch (action.type) {
    case "SECTION_MODIFY_ACTION":
      return {
        ...state,
        sectionModalState: action.state,
        sectionId: action.sectionId,
        sectionModalMode: action.mode,
        sectionDetails: null,
      };

    case "SECTION":
      return {
        ...state,
        sectionDetails: action.details,
      };

    case "SECTIONS":
      return {
        ...state,
        sectionsLoading: action.loading,
        sections: action.data,
      };

    default:
      return state;
  }
};

export default sectionAction;

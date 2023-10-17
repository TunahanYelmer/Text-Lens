export const initialState = {
  clickCount: 0,
  active: false,
  canvasCoords: { x1: 0, y1: 0, x2: 0, y2: 0 },
  image: null,
  returnText: "",
  isCopied: false,
  buttonText: "Copy to Clipboard",
  coordinatesSet: false,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "Activate_Screen_Capture":
      return {
        ...state,
        active: true,
        clickCount: 0,
        canvasCoords: { x1: 0, y1: 0, x2: 0, y2: 0 },
      };
    case "Parse_Image":
      return {
        ...state,
        image: action.image,
      };
    case "Deactivate_Screen_Capture":
      return {
        ...state,
        active: false,
        clickCount: 0,
        canvasCoords: { x1: 0, y1: 0, x2: 0, y2: 0 },
      };
    case "Cancel_Screen_Capture":
      return {
        ...state,
        clickCount: 0,
        canvasCoords: { x1: 0, y1: 0, x2: 0, y2: 0 },
      };
    case "Update_Click_Count":
      return {
        ...state,
        clickCount: state.clickCount + 1,
      };

    case "Update_Canvas_Coords":
      return {
        ...state,
        canvasCoords: action.canvasCoords,
      };
    case "Return_Recognised_Text":
      return {
        ...state,
        returnText: action.returnText,
      };
    case "Set_Copied":
      return {
        ...state,
        isCopied: action.isCopied,
      };
    case "Change_Button_Text":
      return {
        ...state,
        buttonText: action.buttonText,
      };
    case "Reset_Return_Text":
      return {
        ...state,
        returnText: "",
      };
    case "Coordinates_Set":
      return {
        ...state,
        coordinatesSet: action.coordinatesSet,
      };
    default:
      return state;
  }
};
export default reducer;

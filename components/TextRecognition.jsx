import Tesseract from "tesseract.js";

export default async function TextRecognition(image, dispatch) {
  const returnRecognisedText = (text) => {
    dispatch({
      type: "Return_Recognised_Text",
      returnText: text,
    });
  };

  await Tesseract.recognize(image)
    .then(({ data: { text } }) => {
      console.log(text);
      returnRecognisedText(text);
    })
    .catch((error) => {
      console.error("Error during OCR:", error);
    });
}

"use client";
import { useState } from "react";
import styles from "../styles/TextDisplay.module.css";
import { useDataLayerValue } from "@/contexts/DataContext";
import { Clipboard, CheckLg } from "react-bootstrap-icons";

function TextDisplay() {
  const [{ returnText, buttonText, isCopied }, dispatch] = useDataLayerValue();
  const ChangeButtonText = () => {
    dispatch({ type: "Change_Button_Text", buttonText: "Copied!" });
    dispatch({ type: "Set_Copied", isCopied: true });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(returnText)
      .then(() => {
        console.log("Text copied to clipboard");
        ChangeButtonText();
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  if (returnText === "") {
    return null; // Return null when returnText is empty to hide the component
  }

  return (
    <div className={styles.textDisplay_Waterfall}>
      <div className={styles.textDisplay_Container}>
        <div className={styles.textDisplay}>
          <div className={styles.textDisplay_text}>{returnText}</div>
        </div>
        <button
          className={styles.textDisplay_Copy}
          onClick={handleCopyToClipboard}
        >
          {isCopied ? <CheckLg /> : <Clipboard />}
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TextDisplay;

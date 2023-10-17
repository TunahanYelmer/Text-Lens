"use client";
import { useDataLayerValue } from "@/contexts/DataContext";
import styles from "../styles/Cancel.module.css";
import * as İcons from "react-bootstrap-icons";
import { restorePage } from "./RestorePage";
function Cancel() {
  const [, dispatch] = useDataLayerValue();
  const cancelScreenshot = () => {
    dispatch({
      type: "Cancel_Screen_Capture",
    });
  };
  const resetReturnText = () => {
    dispatch({
      type: "Reset_Return_Text",
    });
  };
  return (
    <div className="cancel">
      <button
        className={styles.cancel_button}
        onClick={(event) => {
          cancelScreenshot(), restorePage();
          resetReturnText();
        }}
      >
        <İcons.XLg />
        Cancel
      </button>
    </div>
  );
}

export default Cancel;

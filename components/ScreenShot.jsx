"use client";

import { useEffect } from "react";
import { useDataLayerValue } from "@/contexts/DataContext.js";
import styles from "../styles/Screenshot.module.css";
import ScanTextIcon from "./icons/scan_text_filled_icon_201925.svg";
import Image from "next/image";
import html2canvas from "html2canvas";
import TextRecognition from "./TextRecognition";
import { toast } from "react-toastify";


const Screenshot = () => {
  const [{ clickCount, active, canvasCoords, coordinatesSet }, dispatch] =
    useDataLayerValue() || [{}];
  const activateScreen = () => {
    dispatch({ type: "Activate_Screen_Capture" });
    dispatch({ type: "Update_Click_Count" });
  };
  const deactivateScreen = () => {
    dispatch({ type: "Deactivate_Screen_Capture" });
  };
  const handleDataUrl = (dataUrl) => {
    dispatch({ type: "Parse_Image", dataUrl });
  };
  useEffect(() => {
    const handleMouseDown = (e) => {
      console.log(e.target.tagName);
      if (
        e.target.tagName !== "BUTTON" &&
        e.target.tagName !== "SPAN" &&
        active
      ) {
        const { pageX, pageY } = e;
        dispatch({
          type: "Update_Canvas_Coords",
          canvasCoords: { ...canvasCoords, x1: pageX, y1: pageY },
        });
        console.log(canvasCoords);
      } else if (e.target.tagName === "BUTTON" && e.target.tagName !== "SPAN") {
        return;
      }
    };
    const handleMouseUp = (e) => {
      console.log(e.target.tagName);
      if (
        e.target.tagName !== "BUTTON" &&
        e.target.tagName !== "SPAN" &&
        active
      ) {
        const { pageX, pageY } = e;
        dispatch({
          type: "Update_Canvas_Coords",
          canvasCoords: { ...canvasCoords, x2: pageX, y2: pageY },
        });
        dispatch({ type: "Coordinates_Set", coordinatesSet: true });
      } else if (e.target.tagName === "BUTTON") {
        return;
      }
      console.log(coordinatesSet);
    };
    if (active == true) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      return;
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [active, canvasCoords, coordinatesSet, dispatch]);

  const handleScreenshot = async () => {
    if (active == true) {
      deactivateScreen();
      const x1 = Math.min(canvasCoords?.x1 ?? 0, canvasCoords?.x2 ?? 0);
      const y1 = Math.min(canvasCoords?.y1 ?? 0, canvasCoords?.y2 ?? 0);
      const x2 = Math.max(canvasCoords?.x1 ?? 0, canvasCoords?.x2 ?? 0);
      const y2 = Math.max(canvasCoords?.y1 ?? 0, canvasCoords?.y2 ?? 0);
      const width = x2 - x1;
      const height = y2 - y1;

      if (width === 0 || (height === 0 && coordinatesSet == true)) {
        toast.error(
          "OCR Failed, The Size of the selected area is too small. Please try again.",
          
        );
        dispatch({ type: "Coordinates_Set", coordinatesSet: false });
        deactivateScreen();
        return;
      }

      const targetElement = document.documentElement;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      const screenshotCanvas = await html2canvas(targetElement, {
        x: x1,
        y: y1,
        width,
        height,
      });

      context.drawImage(screenshotCanvas, 0, 0, width, height);
      const screenshot = canvas.toDataURL();
      handleDataUrl(screenshot);
      TextRecognition(screenshot, dispatch);
    } else {
      return;
    }
  };
  if (coordinatesSet) {
    handleScreenshot();
  }
  return (
    <div className={styles.screenshot}>
      <button
        className={styles.screenshot_button_activate}
        onClick={activateScreen}
      >
        <Image src={ScanTextIcon} alt="Scan Text Icon" />
        <span>Scan Text</span>
      </button>
      jasodjasldjaslkdjklasdjlkasjdlkajdlkajlkajsljasldkjlkwjlkajwdlajwdlkjawldkjawldjalwdjlakwjd
    </div>
  );
};

export default Screenshot;

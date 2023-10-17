"use client";
import Screenshot from "@/components/ScreenShot";
import Cancel from "@/components/Cancel";
import TextDisplay from "@/components/TextDisplay";
import { DataProvider } from "@/contexts/DataContext";
import styles from "@/styles/Home.module.css";
import { useDataLayerValue } from "@/contexts/DataContext";
import { ToastContainer } from "react-toastify";
import toastifystyles from "@/styles/Toastify.module.css";

export default function Home() {
  const cursorStyle = { cursor: "crosshair" };
  return (
    <main className={styles.homepage} style={cursorStyle}>
      <DataProvider>
        <div className={toastifystyles.homepage_container__ToastContainer}>
          <ToastContainer className={`${toastifystyles.toast_container} toast-container`} />
          <div className={styles.homepage_container__Screenshot}>
            <Screenshot />
          </div>
          <div className={styles.homepage_container__Cancel}>
            <Cancel />
          </div>
          <TextDisplay />
        </div>
      </DataProvider>
    </main>
  );
}

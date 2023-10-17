import styles from "../styles/ScreenShot.module.css";
import "./Cancel.jsx"
export function darkenPage() {
  const overlay = document.createElement("div");
  overlay.className = styles["dark-overlay"];
  // Rest of your overlay styling
  document.body.appendChild(overlay);
}

export function restorePage() {
  const overlay = document.querySelector(`.${styles["dark-overlay"]}`);
  if (overlay) {
    overlay.remove();
  }
  console.log("restorePage");
}


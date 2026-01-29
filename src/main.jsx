import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AppProvider } from "./context/AppContext";

/**
 * main.jsx: 애플리케이션 진입점
 * - React 앱을 DOM에 마운트
 * - AppProvider로 전역 Context 제공
 * - StrictMode로 개발 시 잠재적 문제 감지
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);

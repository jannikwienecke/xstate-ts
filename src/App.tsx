import React from "react";
import "./App.css";
import { AttendanceStateProvider } from "./features/attendance/state/AttendanceStateProvider";
import { Attendance } from "./features/attendance/ui/Attendance";

function App() {
  const [app, setApp] = React.useState<"attendance">();

  if (app) {
    return (
      <AttendanceStateProvider>
        <Attendance />
      </AttendanceStateProvider>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#333",
        height: "100vh",
        color: "#eee",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>SELECT YOUR APP</h1>
      <ul style={{ listStyle: "none" }}>
        <li
          onClick={() => setApp("attendance")}
          style={{
            padding: "1rem",
            background: "#222",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "lightcyan",
          }}
        >
          Attendance App
        </li>
      </ul>
    </div>
  );
}

export default App;

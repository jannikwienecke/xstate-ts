import React from "react";
import "./App.css";
import { AttendanceStateProvider } from "./features/attendance/state/AttendanceStateProvider";
import { Attendance } from "./features/attendance/ui/Attendance";

function App() {
  const [app, setApp] = React.useState<"attendance">();

  const AttendanceRoute = (
    <AttendanceStateProvider>
      <Attendance />
    </AttendanceStateProvider>
  );

  const Menu = (
    <>
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
    </>
  );

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
      {app === "attendance" ? AttendanceRoute : Menu}
    </div>
  );
}

export default App;

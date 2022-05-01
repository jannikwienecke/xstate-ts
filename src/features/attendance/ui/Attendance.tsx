import React from "react";
import { MachineState } from "../../../ui/MachineState";
import { useAttendanceState } from "../state/AttendanceStateProvider";
import { LoggedInScreen } from "./LoggedInScreen";
import { NotLoggedInScreen } from "./NotLoggedInScreen";

export const LoadingScreen = () => {
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
      <h1>Loading Attendance</h1>
    </div>
  );
};
export const Attendance = () => {
  const { isCheckedIn, isOptimisticLoggedIn, fetchData, hasData } =
    useAttendanceState();

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  let ComponentToRender = NotLoggedInScreen;

  if (isCheckedIn || isOptimisticLoggedIn) {
    ComponentToRender = LoggedInScreen;
  }

  if (!hasData) return <LoadingScreen />;
  return (
    <div>
      <h1>TESTING FETCH MACHINE</h1>
      <MachineState />

      <ComponentToRender />

      <br />
    </div>
  );
};

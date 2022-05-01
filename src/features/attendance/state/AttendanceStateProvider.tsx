import React from "react";
import { useAttendancePage } from "../hooks/useAttendancePage";
import { Context } from "./types";

export const GlobalStateContext = React.createContext<Context>({} as Context);

type Props = {
  children?: React.ReactNode;
};
export const AttendanceStateProvider: React.FC<Props> = ({ children }) => {
  const attendanceState = useAttendancePage();

  return (
    <GlobalStateContext.Provider value={attendanceState}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useAttendanceState = () => {
  const state = React.useContext(GlobalStateContext);

  if (!state) {
    throw new Error(
      "useAttendanceState must be used within a GlobalStateProvider"
    );
  }

  return state;
};

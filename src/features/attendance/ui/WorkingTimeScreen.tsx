import { useSelector } from "@xstate/react";
import React from "react";
import { useAttendanceState } from "../state/AttendanceStateProvider";
import { workingTimeSelector } from "../state/selectors";

export const WorkingTimeScreen = () => {
  const { stateRef } = useAttendanceState();
  const workingTime = useSelector(stateRef, workingTimeSelector);

  return (
    <h1>
      Working Time:
      {parseInt(String(workingTime / 1000), 10)}
    </h1>
  );
};

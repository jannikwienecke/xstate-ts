import { useSelector } from "@xstate/react";
import React from "react";
import { useAttendanceState } from "../features/attendance/state/AttendanceStateProvider";

export const MachineState: React.FC<{}> = ({}) => {
  const { stateRef } = useAttendanceState();
  const state = useSelector(stateRef, (state) => state);
  if (!state) return null;

  return (
    <div style={{ opacity: "0.9" }}>
      <pre style={{ fontSize: "1.4rem" }}>
        {JSON.stringify(
          {
            value: state.value,
            context: state.context,
            nextEvents: state.nextEvents,
            history: state.history?.value,
          },
          null,
          1
        )}
      </pre>
    </div>
  );
};

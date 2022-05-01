import { useInterpret, useSelector } from "@xstate/react";
import React from "react";
import { assign, send, spawn } from "xstate";
import { fetchAttendanceData } from "../../../api";
import { isAttendanceData } from "../../../guards";
import { fetchMachine } from "../../../stateMachines/fetchMachine/fetchMachine";
import {
  hasDataSelector,
  stateRefSelector,
} from "../../../stateMachines/fetchMachine/selectors";
import {
  isCheckedInSelector,
  isTogglingSelector,
  showWorkingTimeSelector,
  wasCheckedInSelector,
} from "../state/selectors";
import { fetchControllerMachine } from "../state/stateMachine";
import { AttendanceMachineType } from "../state/types";

export const useAttendancePage = () => {
  const attendanceMachine = useInterpret(fetchMachine, {
    services: {
      fetchData: fetchAttendanceData,
    },

    actions: {
      // this is the machine that processes the data that is being fetched from this machine
      spawn: assign({
        stateRef: (context, event) => {
          return spawn(fetchControllerMachine, {
            sync: true,
          });
        },
      }),

      send_data_to_child: send(
        (context, event) => {
          if (isAttendanceData(context.data)) {
            return { type: "INIT_MACHINE", data: context.data };
          } else {
            throw new Error("Invalid data");
          }
        },
        {
          to: (context) => context.stateRef,
        }
      ),
    },
  });

  const stateRef: AttendanceMachineType = useSelector(
    attendanceMachine,
    stateRefSelector
  );

  const sendEvent = stateRef.send;
  const hasData = useSelector(attendanceMachine, hasDataSelector);

  const { send: sendLoadingEvent } = attendanceMachine;
  const isCheckedIn = useSelector(stateRef, isCheckedInSelector);
  const wasCheckedIn = useSelector(stateRef, wasCheckedInSelector);
  const isToggling = useSelector(stateRef, isTogglingSelector);
  const showWorkingTime = useSelector(stateRef, showWorkingTimeSelector);

  const isOptimisticLoggedIn = isToggling && !wasCheckedIn;

  const fetchData = React.useCallback(() => {
    sendLoadingEvent("FETCH_DATA");
  }, [sendLoadingEvent]);

  return {
    attendanceMachine,
    sendEvent,
    stateRef,
    isCheckedIn,
    isOptimisticLoggedIn,
    showWorkingTime,
    fetchData,
    hasData,
  };
};

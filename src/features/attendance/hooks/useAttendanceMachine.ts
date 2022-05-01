import { useInterpret, useSelector } from "@xstate/react";
import { assign, spawn, send } from "xstate";
import { isAttendanceData } from "../../../guards";
import { fetchMachine } from "../../../stateMachines/fetchMachine/fetchMachine";
import { stateRefSelector } from "../../../stateMachines/fetchMachine/selectors";
import { AttendanceContextType } from "../../../types";
import { fetchControllerMachine } from "../state/stateMachine";
import { AttendanceMachineType } from "../state/types";

export const useAttendanceMachine = () => {
  const attendanceMachine = useInterpret(fetchMachine, {
    services: {
      fetchData: async (context, event) => {
        return new Promise<AttendanceContextType>((res) => {
          setTimeout(() => {
            // THESE DATA WILL BE SEND TO "send_data_to_child"
            res({
              action: "check_in",
              error_message: undefined,
              timestamp: new Date().getTime() - 8000,
              rollbackState: "",
              startWorkingTime: new Date().getTime(),
              workingTime: 0,
            });
          }, 1000);
        });
      },
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

  const { send: sendLoadingEvent } = attendanceMachine;

  console.log("render....123");
  return { sendEvent, sendLoadingEvent, stateRef, attendanceMachine };
};

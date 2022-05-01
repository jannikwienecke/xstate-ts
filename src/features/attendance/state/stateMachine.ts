import { assign, createMachine, send } from "xstate";
import { isAttendanceData } from "../../../guards";
import {
  AttendanceContextType,
  AttendanceTogglerResponse,
} from "../../../types";

let action: "check_in" | "check_out" = "check_in";

export const fetchControllerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAtBg9gHZoBO+ANuWCTgLYCG2AloWAHRr5RTktQCCaNGEIR6hDGADEEIuxYA3fAGt2qTLgLEylanUZYW7Tt16EBQkWIlgEi-BnpomRANoAGALqJQAB3ywTM5EPiAAHogATJEAHGwALACsiQCMAJzuAGxpmZkA7AUAzAA0IACeiIWZCemJMe6pWZEZhQC+raXq2HhEpBRUNAzMrBxcPHyCwqLiklLUZCRsvuROyPgktGxdmr06A-rDxmNmFlPWknaESo7BhB7eSCD+gbehEQiFhfFsaTF-eZkUvFgZlmqUKggUjFEmxMok8olInlIklMu5Yu1Ouhulo+rpBgYjKNTBNLNMbFIAMIACQAopSANIAfQAkgA5ULPIIuQhvRAwwoxFKFX4xeJ5FL5BFpcGIHCFGGJNJ5GKxeqRRHxIWZTEgbY9bT9PRDQwjEzjcyTKwzaQ0+nMgDyAFUACqcgLckKPd44ZpxFXZRLuPLuNLA4OyhB5NKwqXi9HI9IpXX63F7Y2EkbYMAYVQQHD4ACuaCkLodAHFywAZWnul48vkIX3Qn6JLVpP2ZQoomKRlJI2FB9X9v4a5Ep7E7Q34g6m9jZ3OQHAsNiwLD4ADuOA3YHIBFo0jCsDQTnY9GQwhIAApCu47wBKKSp3ZGgmHNgLvPLwir9dbnd7vgB51p6vLeogKSSmwkr9okhTRoCGSZJGvopDCMTdvkkSFFCYoAvEE4aAaeL7CaRKfkuLClhW1a1o8XKvOBTZAt8iT5O4nzxF2MQZHk8QoWisIFHkXwxCJbbBoROIvjOZGsFI7Isi6TIALL8DS7J0X4HqMaAPrxJ8bCxFkKQcUKyQAih8TYWwCrBqJjT9u0HQgIQ+AQHAoTPtOpGZkcJKWmS5xgCBunhHKwrVOJkSZOK2QolqiSRsibBse4aFoQCHbwXkUlTiRGbvhR+ZFmgoUNkxOBtnE8TKjhwIFGigrJYU0HcfEoZQnByppHlxHpm+c4flgOZfiua6btuu77iF9E6RVekReibB3jE+T9l88TpLFKHRJEtlVPC7hCulW3dn1aavrO5EjYu+bjX+27rMofA4M4wFzfWXqLR87jfDFm2nRhDQpLt0QHXCIYnUCwqJBdMm+UVt1jWB2lfaj4XMTFK3Het2HAtt-HlHKzQCkiBnIoCx1ofDPmFXO5XfZjVUpbVIksY1ZkoUOtlbV2CKhj2KLOa0QA */
  createMachine(
    {
      context: {
        action: "check_out",
        timestamp: 0,
        rollbackState: "",
        startWorkingTime: 0,
        workingTime: 0,
      } as AttendanceContextType,
      tsTypes: {} as import("./stateMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | {
              type: "INIT_MACHINE";
              data: { action: "check_in" | "check_out"; timestamp: number };
            }
          | {
              type: "CHECK_IN";
            }
          | {
              type: "CHECK_OUT";
            }
          | {
              type: "TOGGLE";
            }
          | {
              type: "tick";
            },
      },
      id: "fetch-controller-machine",
      initial: "checked-out",
      on: {
        INIT_MACHINE: [
          {
            actions: "saveData",
            cond: "isCheckedIn",
            target: ".checked-in",
          },
          {
            actions: "saveData",
            cond: "isCheckedOut",
            target: ".checked-out",
          },
        ],
      },
      states: {
        togglingAttendance: {
          entry: ["handleToggleInit", "resetStartWorkingTime"],
          invoke: {
            src: "toggleAttendance",
            onDone: [
              {
                actions: "handleValidToggleResponse",
              },
            ],
            onError: [
              {
                actions: "handleInvalidToggleResponse",
              },
            ],
          },
          on: {
            CHECK_IN: {
              target: "checked-in",
              // actions: "resetStartWorkingTime",
            },
            CHECK_OUT: {
              target: "checked-out",
              // actions: "resetStartWorkingTime",
            },
          },
        },
        "checked-out": {
          on: {
            TOGGLE: {
              target: "togglingAttendance",
            },
          },
        },
        "checked-in": {
          initial: "show-welcome",
          invoke: {
            src: "workingTimeTimer",
          },
          states: {
            "show-welcome": {
              after: {
                "3000": {
                  target: "show-working-time",
                },
              },
            },
            "show-working-time": {},
          },
          on: {
            TOGGLE: {
              target: "togglingAttendance",
            },
            tick: {
              actions: "handleTick",
            },
          },
        },
      },
    },
    {
      services: {
        toggleAttendance: async (context, event, state) => {
          return new Promise<AttendanceTogglerResponse>((res, rej) => {
            window.setTimeout(() => {
              console.log("state: ", state.data);
              // rej({});
              action = action === "check_in" ? "check_out" : "check_in";
              res({
                action,
                error_message: undefined,
              });
            }, 1000);
          });
        },
        workingTimeTimer: (context) => (cb) => {
          const interval = setInterval(() => {
            cb("tick");
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
      actions: {
        resetStartWorkingTime: assign((context, event) => {
          return {
            ...context,
            workingTime: 0,
          };
        }),
        saveData: assign((context, event) => {
          if (!isAttendanceData((event as any).data)) {
            throw new Error("Invalid data");
          }

          const startWorkingTime =
            event.data.action === "check_out" ? 0 : event.data.timestamp;

          const workingTime = new Date().getTime() - startWorkingTime;

          return {
            ...context,
            ...event.data,
            startWorkingTime,
            workingTime,
          };
        }),
        handleValidToggleResponse: send((context, event) => {
          const action =
            "action" in (event.data as any) && (event.data as any).action;

          const eventName = action === "check_in" ? "CHECK_IN" : "CHECK_OUT";

          return {
            type: eventName,
          };
        }),

        handleInvalidToggleResponse: send((context) => {
          console.log("__context: ", context);

          const rollbackEventName =
            context.rollbackState === "check_in" ? "CHECK_IN" : "CHECK_OUT";

          return {
            type: rollbackEventName,
          };
        }),

        handleToggleInit: assign((context, event, state) => {
          const currentState = state.state?.value;
          const rollbackState = currentState;

          return {
            ...(context as any),
            rollbackState,
          };
        }),

        handleTick: assign({
          workingTime: (context) => context.workingTime + 1000,
        }),
      },
      guards: {
        isCheckedIn: (context, event) => {
          return isAttendanceData(event.data)
            ? event.data.action === "check_in"
            : false;
        },

        isCheckedOut: (context, event) => {
          return isAttendanceData(event.data)
            ? event.data.action === "check_out"
            : false;
        },
      },
    }
  );

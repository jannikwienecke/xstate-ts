// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    saveData: "INIT_MACHINE";
    handleValidToggleResponse: "done.invoke.fetch-controller-machine.togglingAttendance:invocation[0]";
    handleInvalidToggleResponse: "error.platform.fetch-controller-machine.togglingAttendance:invocation[0]";
    handleTick: "tick";
    handleToggleInit: "TOGGLE";
    resetStartWorkingTime: "TOGGLE";
  };
  internalEvents: {
    "done.invoke.fetch-controller-machine.togglingAttendance:invocation[0]": {
      type: "done.invoke.fetch-controller-machine.togglingAttendance:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.fetch-controller-machine.togglingAttendance:invocation[0]": {
      type: "error.platform.fetch-controller-machine.togglingAttendance:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    toggleAttendance: "done.invoke.fetch-controller-machine.togglingAttendance:invocation[0]";
    workingTimeTimer: "done.invoke.fetch-controller-machine.checked-in:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    workingTimeTimer: "INIT_MACHINE" | "CHECK_IN";
    toggleAttendance: "TOGGLE";
  };
  eventsCausingGuards: {
    isCheckedIn: "INIT_MACHINE";
    isCheckedOut: "INIT_MACHINE";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "togglingAttendance"
    | "checked-out"
    | "checked-in"
    | "checked-in.show-welcome"
    | "checked-in.show-working-time"
    | { "checked-in"?: "show-welcome" | "show-working-time" };
  tags: never;
}

// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    handleValidResponse: "done.invoke.fetch-machine.pending:invocation[0]";
    handleInvalidResponse: "error.platform.fetch-machine.pending:invocation[0]";
    spawn: "xstate.init";
    send_data_to_child: "done.invoke.fetch-machine.pending:invocation[0]";
  };
  internalEvents: {
    "done.invoke.fetch-machine.pending:invocation[0]": {
      type: "done.invoke.fetch-machine.pending:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.fetch-machine.pending:invocation[0]": {
      type: "error.platform.fetch-machine.pending:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchData: "done.invoke.fetch-machine.pending:invocation[0]";
  };
  missingImplementations: {
    actions: "spawn" | "send_data_to_child";
    services: "fetchData";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchData: "FETCH_DATA" | "REFETCH_DATA" | "RETRY__FETCH";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "pending" | "hasData" | "hasError";
  tags: never;
}
export interface Typegen1 {
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

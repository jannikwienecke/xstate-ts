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

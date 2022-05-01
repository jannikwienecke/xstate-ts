import { createMachine, assign } from "xstate";

export const fetchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAtAWwENsBLAOzADpiIAbMAYgDEBRAFQGEAJAfQBEBBVv0SgADgHtYxNMXGkRIAB6IAjADYADBQAsG7QE4AzGoAcpgOwaTKgDQgAnqvNqKm8wFZ3GlZ8MAmc3MAXyC7VExcQhJyClEwUggyKHoIOUoyADdxAGtKcOx8IiwySjiEpIRM8QwCGTkAbQ0AXQUJKTr5JCVEdxUKd21tD30NNW0VQ31zEztHBHHtCm9p4z8RlWd3ELD0AqjimLLE0mSwACcz8TPYmlrkK7wKfMiiktj446hK0iyajsaWl02tJZJ1QMoEO5zH4KCZzEMNIZzIYkfo-NpZog-EiKPpxioNBp9EYjB5gqEQM9CtFSh8kvQAErMdjMACSADVmHxBMIgZIQXIFBCUVp9L1rGsoSiDJiEP4+iNDATkSoTNpDO4TNtKbsXjT3uUTkw2FxuIx+KyADLMXitfkdIU9TQ6Yko9yGaxDSayjbmCjKgYqCaE1VQ7VU-ZvLAEWC8WoERnMFgcHgCIR29qgx3zYz9FS6EzubE+TwzByIeW4xHKpVqjXI8O66kHSjR2DMC5XROsBkATW4ZpNnAzArB3UhzrWHiD40VJj8su0MLFxImagmPkL+hCFNI4ggcAUEdeMWodBHDq6EKXPssrkRan8aj8L+masbEWbbyOSQvWavFZ6BQliqkSajEgEGjuD62juP6Kh+ES876Oo6pahSx76m2cZoAQf6CgBcq9LiHpDH4AxqOYipqIu3h5rBYwTGYejuGoH57CerYxh2lxnPhY4QvC+iuPoYzquompFgu5YIKqhg6O6JbaGM1hqGxGFNpG5D8dmqqyjg1hLPmejQu6eLuMSO5BEAA */
  createMachine(
    {
      tsTypes: {} as import("./fetchMachine.typegen").Typegen0,
      context: { stateRef: null } as {
        stateRef: null | any;
        data: unknown;
        error: unknown;
      },
      schema: {
        events: {} as
          | { type: "FETCH_DATA" }
          | { type: "REFETCH_DATA" }
          | { type: "RETRY__FETCH" },
      },
      entry: "spawn",
      id: "fetch-machine",
      initial: "idle",
      states: {
        idle: {
          on: {
            FETCH_DATA: {
              target: "pending",
            },
          },
        },
        pending: {
          invoke: {
            src: "fetchData",
            onDone: [
              {
                actions: "handleValidResponse",
                target: "hasData",
              },
            ],
            onError: [
              {
                actions: "handleInvalidResponse",
                target: "hasError",
              },
            ],
          },
        },
        hasData: {
          entry: "send_data_to_child",
          on: {
            REFETCH_DATA: {
              target: "pending",
            },
          },
        },
        hasError: {
          on: {
            RETRY__FETCH: {
              target: "pending",
            },
          },
        },
      },
    },
    {
      actions: {
        handleValidResponse: assign((context, event) => {
          return {
            ...context,
            data: event.data,
          };
        }),
        handleInvalidResponse: assign((context, event) => {
          return {
            ...context,
            error: event.data,
          };
        }),
      },
    }
  );

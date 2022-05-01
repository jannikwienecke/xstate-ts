import { FetchMachineSelector } from "./types";

export const stateRefSelector: FetchMachineSelector = (state) => {
  return state.context.stateRef;
};

export const hasDataSelector: FetchMachineSelector = (state) => {
  return state.context.data;
};

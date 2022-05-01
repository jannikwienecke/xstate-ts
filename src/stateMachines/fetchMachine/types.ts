import { InterpreterFrom } from "xstate";
import { fetchMachine } from "./fetchMachine";

export type AttendanceMachineType = InterpreterFrom<typeof fetchMachine>;

export type FetchMachineSelector = (
  state: AttendanceMachineType["state"]
) => any;

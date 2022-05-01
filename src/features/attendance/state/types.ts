import { InterpreterFrom } from "xstate";
import { useAttendancePage } from "../hooks/useAttendancePage";
import { fetchControllerMachine } from "./stateMachine";

export type AttendanceMachineType = InterpreterFrom<
  typeof fetchControllerMachine
>;

export type Context = ReturnType<typeof useAttendancePage>;

export type AttendanceStateType = AttendanceMachineType["state"];

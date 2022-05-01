import { AttendanceStateType } from "./types";

export const workingTimeSelector = (state: AttendanceStateType) =>
  state.context.workingTime;

export const isTogglingSelector = (state: AttendanceStateType) =>
  state.matches("togglingAttendance");

export const isCheckedInSelector = (state: AttendanceStateType) =>
  state.matches("checked-in");

export const wasCheckedInSelector = (state: AttendanceStateType) =>
  state.history?.matches("checked-in");

export const showWorkingTimeSelector = (state: AttendanceStateType) =>
  state.matches("checked-in.show-working-time");

export const stateMatchesSelector = (state: AttendanceStateType) =>
  state.matches;

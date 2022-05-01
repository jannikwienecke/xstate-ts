import { AttendanceContextType, AttendanceTogglerResponse } from "./types";

export const fetchAttendanceData = async () => {
  return new Promise<AttendanceContextType>((res) => {
    setTimeout(() => {
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
};

let action: "check_in" | "check_out" = "check_in";

export const toggleAttendance = async (
  context: AttendanceContextType,
  event: any
) => {
  return new Promise<AttendanceTogglerResponse>((res, rej) => {
    window.setTimeout(() => {
      // rej({});
      action = action === "check_in" ? "check_out" : "check_in";
      res({
        action,
        error_message: undefined,
      });
    }, 1000);
  });
};

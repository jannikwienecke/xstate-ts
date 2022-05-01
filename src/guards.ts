import { AttendanceContextType } from "./types";

export function isAttendanceData(
  attendanceData: unknown
): attendanceData is AttendanceContextType {
  return (attendanceData as AttendanceContextType).action !== undefined;
}

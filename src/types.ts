export interface AttendaneContextType {
  action: "check_in" | "check_out";
  error_message?: string;
  timestamp: number;
}

export interface AttendanceContextType {
  action: "check_in" | "check_out";
  error_message?: string;
  timestamp: number;
  rollbackState: string;
  startWorkingTime: number;
  workingTime: number;
}

export interface AttendanceTogglerResponse {
  action: "check_in" | "check_out";
  error_message?: string;
}

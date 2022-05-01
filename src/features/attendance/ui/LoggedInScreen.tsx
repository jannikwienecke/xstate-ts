import { useAttendanceState } from "../state/AttendanceStateProvider";
import { WorkingTimeScreen } from "./WorkingTimeScreen";

export const LoggedInScreen = () => {
  const { sendEvent, showWorkingTime } = useAttendanceState();

  return (
    <>
      {showWorkingTime ? (
        <>
          <WorkingTimeScreen />
        </>
      ) : (
        <>
          <h1>Welcome, you are logged in ! </h1>
        </>
      )}

      <button
        onClick={() => {
          sendEvent({ type: "TOGGLE" });
        }}
      >
        Log Out
      </button>
    </>
  );
};

import { useAttendanceState } from "../state/AttendanceStateProvider";

export const NotLoggedInScreen = () => {
  const { sendEvent } = useAttendanceState();
  return (
    <div>
      <h1>You are not logged in</h1>
      <button
        onClick={() => {
          sendEvent({ type: "TOGGLE" });
        }}
      >
        Log In
      </button>
    </div>
  );
};

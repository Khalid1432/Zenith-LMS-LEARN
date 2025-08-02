import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function JoinLiveClass() {
  const { roomName } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simple check for a valid room name
    if (!roomName) {
      setError(true);
    }
  }, [roomName]);

  return (
    <div className="w-full h-screen">
      {error ? (
        <div className="flex justify-center items-center w-full h-full">
          <h2>Room not found or invalid URL</h2>
        </div>
      ) : (
        <iframe
          src={`https://meet.jit.si/${roomName}`}
          allow="camera; microphone"
          style={{ width: "100%", height: "100%", border: 0 }}
          title="Live Class"
        />
      )}
    </div>
  );
}

export default JoinLiveClass;

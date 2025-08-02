import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { VideoIcon } from "@radix-ui/react-icons";

function LiveClassList() {
  const [liveClasses, setLiveClasses] = useState([]);

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const response = await axiosInstance.get("/api/liveClass");
        setLiveClasses(response.data.liveClasses);
      } catch (error) {
        console.error("Error fetching live classes", error);
      }
    };

    fetchLiveClasses();
  }, []);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto font-sans">
      <h2 className="text-center text-4xl font-semibold text-gray-800 mb-8">
        Live Classes
      </h2>
      {liveClasses.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No live classes available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveClasses.map((liveClass) => (
            <div
              key={liveClass._id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {liveClass.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {liveClass.description}
              </p>
              <div className="text-gray-500 text-sm mb-4">
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(liveClass.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {liveClass.startTime} -{" "}
                  {liveClass.endTime}
                </p>
              </div>
              <a
                href={liveClass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <VideoIcon className="mr-2 w-4 h-4" /> Join Class
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveClassList;

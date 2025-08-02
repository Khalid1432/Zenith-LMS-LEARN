import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";

function UpcomingClasses() {
    const [classes, setClasses] = useState([]);
    console.log("clssssssssss :",classes );
    

    useEffect(() => {
        axiosInstance
            .get("/api/liveclass/upcoming")
            .then((res) => setClasses(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Upcoming Live Classes</h2>
            {classes.length === 0 ? (
                <p>No classes found.</p>
            ) : (
                classes.map((cls, index) => (
                    <div key={cls._id} className="p-4 border rounded mb-4 shadow">
                        <h3 className="font-semibold text-lg">{cls.title}</h3>
                        <p>{cls.description}</p>
                        <p>
                            {new Date(cls.date).toLocaleDateString()} | {cls.startTime} - {cls.endTime}
                        </p>
                        <a
                            href={cls.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-blue-600 underline"
                        >
                            Join Class
                        </a>
                    </div>
                ))
            )}
        </div>
    );
}

export default UpcomingClasses;

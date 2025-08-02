import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

function CreateLiveClass() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            setErrorMessage("You must be logged in to create a live class");
            return;
        }

        try {
            const response = await axiosInstance.post(
                "/api/liveClass/create",
                { title, description, date, startTime, endTime },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const link = response?.data?.liveClass?.meetingLink;
            if (link) {
                setSuccessMessage(`Live Class Created! Meeting Link: ${link}`);
            } else {
                setSuccessMessage("Live Class created successfully!");
            }

            setTitle("");
            setDescription("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setErrorMessage("");
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error.response ? error.response.data.message : "An error occurred"
            );
            setSuccessMessage("");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create Live Class
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-4">
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                    Create Class
                </button>
            </form>

            {errorMessage && (
                <p className="mt-4 text-red-600 font-medium text-center">{errorMessage}</p>
            )}
            {successMessage && (
                <p className="mt-4 text-green-600 font-medium text-center">{successMessage}</p>
            )}
        </div>
    );
}

export default CreateLiveClass;

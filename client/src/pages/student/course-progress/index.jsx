import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  return (
     <div className="flex flex-col h-screen bg-gradient-to-b from-[#121212] to-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      {/* Topbar */}
      <div className="flex items-center justify-between p-4 bg-[#1f1f23] shadow-md border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-500 hover:text-white hover:to-blue-500 rounded shadow-md transition duration-300"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block text-slate-200">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="bg-[#2b2b30] hover:bg-[#38383f] rounded-full p-2"
        >
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Section */}
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}
          />
          <div className="p-6 bg-[#1c1d1f] border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow">
              {currentLecture?.title}
            </h2>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[360px] sm:w-[400px] bg-[#18191c] border-l border-gray-800 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          } shadow-xl`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid gap-1 bg-[#1c1d1f] w-full grid-cols-2 h-14 text-black font-medium rounded-none">
              <TabsTrigger
                value="content"
                className="h-full hover:bg-[#2c2d30] hover:text-white transition duration-300"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="h-full hover:bg-[#2c2d30] hover:text-white transition duration-300"
              >
                Overview
              </TabsTrigger>
            </TabsList>

            {/* Course Content Tab */}
            <TabsContent value="content" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4 pt-4 pb-10">
                <div className="space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => {
                      const isViewed = studentCurrentCourseProgress?.progress?.find(
                        (progressItem) => progressItem.lectureId === item._id
                      )?.viewed;

                      return (
                        <div
                          key={item._id}
                          className={`flex items-center space-x-3 text-sm font-medium px-3 py-2 rounded-lg cursor-pointer border border-transparent hover:border-blue-500 transition duration-300 ${
                            isViewed
                              ? "bg-[#223323] text-green-400"
                              : "bg-[#232427] text-white"
                          }`}
                          onClick={() => setCurrentLecture(item)}
                        >
                          {isViewed ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Play className="h-4 w-4 text-blue-400" />
                          )}
                          <span className="truncate">{item?.title}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  About this course
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {studentCurrentCourseProgress?.courseDetails?.description}
                </p>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialog - Course Locked */}
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px] bg-[#1e1f22] text-white border border-red-600 shadow-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-xl">
              You can't view this page
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please purchase this course to get access.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Dialog - Course Completed */}
      <Dialog open={showCourseCompleteDialog} >
        <DialogContent className="w-[350px] sm:w-[450px] bg-gradient-to-br from-[#1e1e2f] to-[#1a1a26] text-white shadow-lg rounded-2xl border border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-400">
              🎉 Congratulations!
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-4 mt-3 text-sm text-gray-300">
              <Label className="text-lg text-white">
                You have completed the course!
              </Label>
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={() => navigate("/student-courses")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg px-4 py-2 text-white shadow"
                >
                  My Courses
                </Button>
                <Button
                  onClick={handleRewatchCourse}
                  className="bg-[#2b2c35] hover:bg-[#35363f] rounded-lg px-4 py-2"
                >
                  Rewatch Course
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;

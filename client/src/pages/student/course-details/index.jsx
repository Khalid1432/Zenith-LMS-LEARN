import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle,
  Globe,
  Lock,
  PlayCircle,
  Layers,
  FileText,
  GraduationCap,
  User2,
  CalendarDays,
  Users,
  IndianRupee,
} from "lucide-react";
import Footer from "@/components/Footer";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    // const checkCoursePurchaseInfoResponse =
    //   await checkCoursePurchaseInfoService(
    //     currentCourseDetailsId,
    //     auth?.user._id
    //   );

    // if (
    //   checkCoursePurchaseInfoResponse?.success &&
    //   checkCoursePurchaseInfoResponse?.data
    // ) {
    //   navigate(`/course-progress/${currentCourseDetailsId}`);
    //   return;
    // }

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };
    
    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
        (item) => item.freePreview
      )
      : -1;

  return (
    <>
      <div className="mx-auto p-4 max-w-screen-xl px-3 py-6 sm:px-4">
        <div className="bg-gray-900 text-white p-8 rounded-t-lg    px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold sm:text-3xl mb-2 sm:mb-4">
            {studentViewCourseDetails?.title}
          </h1>
          <p className="text-lg sm:text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
          <div className="flex gap-x-6 sm:gap-x-4 sm:space-x-4 mt-2 flex-wrap gap-2 text-sm">
            <div className="flex items-center gap-2">
              <User2 size={16} />
              Created by <span className="font-medium">{studentViewCourseDetails?.instructorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {studentViewCourseDetails?.date?.split("T")[0]}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} />
              {studentViewCourseDetails?.primaryLanguage}
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              {studentViewCourseDetails?.students.length}{" "}
              {studentViewCourseDetails?.students.length <= 1 ? "Student" : "Students"}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <main className="flex-grow">
            <Card className="mb-8 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center text-lg space-x-2">
                  <GraduationCap size={28} className="text-indigo-600" />
                  <CardTitle>What you'll learn</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="grid grid-cols-1 gap-2">
                  {studentViewCourseDetails?.objectives
                    .split(",")
                    .map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="mb-8 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center text-lg space-x-2">
                  <FileText size={26} className="text-indigo-600" />
                  <CardTitle>Course Description</CardTitle>
                </div>
              </CardHeader>
              <CardContent>{studentViewCourseDetails?.description}</CardContent>
            </Card>
            <Card className="mb-8 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center text-lg space-x-2">
                  <Layers size={26} className="text-indigo-600" />
                  <CardTitle>Course Curriculum</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {studentViewCourseDetails?.curriculum?.map(
                  (curriculumItem, index) => (
                    <li
                      key={index}
                      className={`${curriculumItem?.freePreview
                        ? "cursor-pointer font-semibold text-indigo-700"
                        : "cursor-not-allowed text-slate-400"
                        } flex items-center mb-4`}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => handleSetFreePreview(curriculumItem)
                          : null
                      }
                    >
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="mr-2 h-5 w-5" />
                      ) : (
                        <Lock className="mr-2 h-5 w-5" />
                      )}
                      <span>{curriculumItem?.title}</span>
                    </li>
                  )
                )}
              </CardContent>
            </Card>
          </main>
          <aside className="w-full md:w-[500px]">
            <Card className="sticky top-4 shadow-lg">
              <CardContent className="py-6">
                <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                  <VideoPlayer
                    url={
                      getIndexOfFreePreviewUrl !== -1
                        ? studentViewCourseDetails?.curriculum[
                          getIndexOfFreePreviewUrl
                        ].videoUrl
                        : ""
                    }
                    width="450px"
                    height="240px"
                  />
                </div>
                <div className="mb-4">
                  <span className="text-2xl sm:text-3xl text-green-600 font-bold">
                    ₹{studentViewCourseDetails?.pricing}
                  </span>
                </div>
                <Button onClick={handleCreatePayment} className="w-full bg-blue-600 hover:bg-blue-700 font-semibold text-base">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
        <Dialog
          open={showFreePreviewDialog}
          onOpenChange={() => {
            setShowFreePreviewDialog(false);
            setDisplayCurrentVideoFreePreview(null);
          }}
        >
          <DialogContent className="w-full sm:w-[800px] outline-blue-700 bg-gray-200" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Course Preview</DialogTitle>
            </DialogHeader>
            <div className="aspect-video rounded-lg">
              <VideoPlayer
                url={displayCurrentVideoFreePreview}
              />
            </div>
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
              {studentViewCourseDetails?.curriculum
                ?.filter((item) => item.freePreview)
                .map((filteredItem, index) => (
                  <p
                    key={index}
                    onClick={() => handleSetFreePreview(filteredItem)}
                    className="cursor-pointer text-[16px] font-medium"
                  >
                    {filteredItem?.title}
                  </p>
                ))}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="bg-blue-700 text-white text-base hover:bg-blue-600">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}

export default StudentViewCourseDetailsPage;

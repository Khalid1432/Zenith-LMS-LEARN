import { courseCategories } from "@/config";
import banner from "../../../assets/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";

import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";


function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-16 px-3 sm:px-6 lg:px-24 gap-8">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight drop-shadow-md">
            Learning that gets you
          </h1>
          <p className="text-xl text-slate-600">
            Skills for your present and future. Get started with <span className="text-blue-600 font-semibold">India</span>.
          </p>
          <Button onClick={() => navigate("/courses")} className="mt-4 px-6 py-3 rounded bg-blue-600 text-white hover:text-gray-200 hover:bg-blue-700 shadow-lg">
            Explore Now
          </Button>
        </div>
        <div className="lg:w-1/2">
          <img
            src={banner}
            alt="Learning banner"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 px-3 sm:px-6 lg:px-24 bg-gradient-to-br from-slate-100 to-white rounded-t-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          Browse Course Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {courseCategories.map((categoryItem) => {
            const Icon = categoryItem.icon;
            return (
              <button
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                className="bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 font-medium px-4 py-3 rounded-xl transition-all shadow hover:shadow-md flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-blue-600" />
                {categoryItem.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-3 sm:px-6 lg:px-24">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem?.title}
                  className="w-full h-40 group-hover:brightness-90"
                />
                <div className="px-4 py-4 space-y-1">
                  <h3 className="text-lg font-semibold text-slate-800 truncate">
                    {courseItem?.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      {courseItem?.instructorName}
                    </p>
                    <p className="text-green-600 font-semibold text-md">
                      ₹ {courseItem?.pricing}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">No Courses Found</p>
          )}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default StudentHomePage;

import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";

// ✅ Live Class Feature Components
import UpcomingClasses from "./components/UpcomingClasses";
import JoinLiveClass from "./pages/JoinLiveClass";
import LiveClassList from "./components/LiveClassList";
import CreateLiveClass from "./components/CreateLiveClass.js";

function App() {
  const { auth } = useContext(AuthContext);
  const user = auth?.user;

  return (
    <Routes>
      {/* Auth Page */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      {/* Instructor Dashboard */}
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      {/* Create or Edit Course */}
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      {/* ✅ Instructor Live Class Form Route */}
      <Route
        path="/instructor/create-live-class"
        element={
          <RouteGuard
            element={<CreateLiveClass instructorId={user?._id} />}
            authenticated={auth?.authenticate}
            user={user}
          />
        }
      />
      {/* Student Layout */}
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route
          path="course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
        {/* ✅ Student Upcoming Classes Page */}
        <Route path="student/upcoming-classes" element={<UpcomingClasses />} />

        {/* ✅ Optional: Embed live class via Jitsi */}
        <Route path="/join/:roomName" element={<JoinLiveClass />} />
        <Route path="/api/liveClass" element={<LiveClassList/>} />
      </Route>
       {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

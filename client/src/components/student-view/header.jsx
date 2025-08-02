import { GraduationCap, TvMinimalPlay, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Explore */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/home"
            className="flex items-center text-slate-800 hover:text-blue-600 transition-colors"
          >
            <GraduationCap className="h-7 w-7 md:h-8 md:w-8 text-blue-600 mr-2" />
            <span className="font-extrabold text-lg md:text-2xl tracking-tight uppercase">
              Zenith <span className="text-blue-600">LMS</span> LEARN
            </span>
          </Link>

          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses") ? null : navigate("/courses");
            }}
            className="hidden md:inline-block text-sm md:text-[16px] font-medium hover:text-blue-600 transition-all"
          >
            Explore Courses
          </Button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <TvMinimalPlay className="w-6 h-6 text-black transition-transform mt-1" />
            <span className="font-semibold text-[15px] md:text-lg text-slate-700 group-hover:text-blue-600 transition-all">
              My Courses
            </span>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-md shadow-md"
          >
            Sign Out
          </Button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-slate-800 focus:outline-none">
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/courses");
              setIsMenuOpen(false);
            }}
            className="text-[15px] font-medium w-full text-left hover:text-blue-600"
          >
            Explore Courses
          </Button>
          <div
            onClick={() => {
              navigate("/student-courses");
              setIsMenuOpen(false);
            }}
            className="flex items-center mx-auto sm:mx-0 mb-3 sm:mb-0 gap-2 cursor-pointer group"
          >
            <TvMinimalPlay className="w-5 h-5 mt-1" />
            <span className="font-medium text-slate-700 group-hover:text-blue-600">
              My Courses
            </span>
          </div>
          <Button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-md shadow-md w-full text-left"
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
}

export default StudentViewCommonHeader;

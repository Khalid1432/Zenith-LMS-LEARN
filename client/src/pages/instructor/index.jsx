import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CreateLiveClass from "@/components/CreateLiveClass.js";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Live Classes",
      value: "liveclasses",
      component: <CreateLiveClass/>,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  function renderMenu(navClass = "") {
    return (
      <nav className={`space-y-2 ${navClass}`}>
        {menuItems.map((menuItem) => (
          <Button
            key={menuItem.value}
            variant={activeTab === menuItem.value ? "secondary" : "ghost"}
            onClick={() => {
              if (menuItem.value === "logout") {
                handleLogout();
              } else {
                setActiveTab(menuItem.value);
                setMobileMenuOpen(false); // Close on select
              }
            }}
            className={`w-full justify-start px-4 py-3 rounded transition-all duration-200 ${
              activeTab === menuItem.value
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <menuItem.icon className="mr-3 w-5 h-5" />
            <span className="text-md font-semibold">{menuItem.label}</span>
          </Button>
        ))}
      </nav>
    );
  }

  return (
    <div className="flex h-full min-h-screen bg-gradient-to-tr from-gray-100 to-white relative">
      {/* Sidebar (desktop) */}
      <aside className="w-64 hidden md:block bg-white/80 backdrop-blur-xl shadow-lg border-r">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Instructor</h2>
          {renderMenu()}
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white/90 shadow px-4 py-3">
        <h2 className="text-xl font-bold text-gray-800">Instructor</h2>
        <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Slide-in Mobile Sidebar */}
      <div
        className={`fixed top-[56px] left-0 w-64 h-full z-20 bg-white shadow-lg p-4 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderMenu()}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 pt-[70px] md:pt-10 overflow-y-auto bg-gray-200 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem, index) => (
              <TabsContent key={index} value={menuItem.value}>
                {menuItem.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;

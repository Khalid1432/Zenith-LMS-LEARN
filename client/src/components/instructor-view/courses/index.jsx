import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex justify-between flex-row items-center ">
        <CardTitle className="text-2xl font-bold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="px-3 text-base bg-blue-500 hover:bg-blue-600 text-white"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ₹{course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6 hover:scale-110 transition-all duration-200 text-blue-500 hover:text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Delete className="h-6 w-6 text-red-500 hover:scale-110 transition-all duration-200" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
